import { Page, Locator, expect } from '@playwright/test';
import footerLinksData from '../../data/footerLinks.json';
import socialLinksData from '../../data/socialLinks.json';
import storeLinksData from '../../data/storeLinks.json';
import footerLegalInfo from '../../data/legalInfo.json';
import legalLinks from '../../data/legalLinks.json';
import dollarLinksData from '../../data/dollarLinks.json';
import accessLinksData from '../../data/accessLinks.json';

export class HomePage {
  readonly page: Page;
  readonly header: Locator;
  readonly divDollar: Locator;
  readonly divAccessContainer: Locator;
  readonly divContent: Locator;
  readonly buttonLogin: Locator;
  readonly buttonSubscribe: Locator;
  readonly footer: Locator;
  readonly imgFooter: Locator;
  readonly mainArticle: Locator;
  readonly mainArticleTitle: Locator;
  readonly mainArticleImg: Locator;
  readonly mainArticles: Locator;
  readonly modal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header.common-header');
    this.divDollar = page.locator('div.dollar');
    this.divAccessContainer = page.locator('div.access-container');
    this.divContent = page.locator('div.content');
    this.buttonLogin = page.locator('button#btningresar');
    this.buttonSubscribe = page.locator('button#btnsuscribite');
    this.footer = page.locator('footer');
    this.imgFooter = page.locator('img[alt="App store"]');
    this.mainArticles = page.locator('article.ln-card');
    this.modal = page.locator('div#notificacion-modal');
  }

  async navigate() {
    await this.page.goto(process.env.URL_HOME as string);
  }

  async waitForPageToBeReady() {
    try {
      await this.page.waitForSelector('main', { state: 'visible', timeout: 15000 });
      console.log('La página cargó correctamente.');
    } catch {
      console.log('La página no terminó de cargar, pero seguimos el test.');
    }
  }  
  

  async validateHeader(shouldBeVisible = false) {
    await expect(this.header).toHaveCount(1);
    if (shouldBeVisible) {
      await expect(this.header).toBeVisible();
    }
  }

  async validateLogo(){
    const logoLink = this.page.locator('a.logo-header');
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute('href', '/');
    await expect(logoLink).toHaveAttribute('title', 'Ir a la página principal');
    const svg = logoLink.locator('svg');
    await expect(svg).toBeVisible();
  }

  async validateTitleText(){
    await expect(this.divContent.locator('h1')).toBeVisible();
    await expect(this.divContent.locator('h1')).toHaveText('LA NACION');
  }

  async validateDollarLinks() {
    await expect(this.divDollar).toBeVisible();
  
    for (let i = 0; i < dollarLinksData.length; i++) {
      const expected = dollarLinksData[i];
      const link = this.divDollar.locator(`ul li a:has-text("${expected.text}")`);
  
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', expected.href);
      await expect(link).toHaveAttribute('title', expected.title);
    }
  }

  async validateAccessLinks() {
    await expect(this.divAccessContainer).toBeVisible();
  
    for (const item of accessLinksData) {
      const link = this.divAccessContainer.locator(`ul li a:has-text("${item.text}")`);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', item.href);
      await expect(link).toHaveAttribute('title', item.title);
    }
  }  

  async validateButtons() {
    await expect(this.buttonLogin).toBeVisible();
    await expect(this.buttonSubscribe).toBeVisible();
    await expect(this.buttonLogin).toBeEnabled();
    await expect(this.buttonSubscribe).toBeEnabled();
  }

  async validateImgFooter(){
    const img = this.imgFooter.nth(0);
    await expect(img).toHaveCount(1);
    await expect(img).toHaveAttribute('src', /la-nacion\.webp/);
  }

  async validateSectionFooter(){
    await expect(this.footer.locator('section')).toBeVisible();
    await this.validateImgFooter();
    await expect(this.footer.locator('div').nth(0)).toBeVisible();
    await expect(this.footer.locator('div').nth(1)).toBeVisible();
  }

  async validateFooterLinksGroups() {
    const firstDiv = this.footer.locator('div').nth(0);
    const footerGroups = footerLinksData.groups;
  
    for (let i = 0; i < footerGroups.length; i++) {
      const groupDiv = firstDiv.locator('div').nth(i);
      const links = footerGroups[i];
  
      for (const text of links) {
        const link = groupDiv.locator(`ul li a span:has-text("${text}")`);
        await expect(link).toBeVisible();
      }
    }
  }

  getDivContainer(num=0) {
    return this.footer
      .locator('div').nth(0)
      .locator('div').nth(4)
      .locator('div').nth(num);
  }  

  async validateSocialMedia() {
    const container = this.getDivContainer();

    await expect(container.locator('p')).toHaveText('Redes sociales:');

    const socialListItems = container.locator('ul li');
  
    for (let i = 0; i < socialLinksData.socialLinks.length; i++) {
      const expected = socialLinksData.socialLinks[i];
      const link = socialListItems.nth(i).locator('a');
  
      await expect(link).toHaveAttribute('href', expected.href);
      await expect(link).toHaveAttribute('title', expected.title);
  
      const iconUse = link.locator('svg use');
      await expect(iconUse).toHaveAttribute('href', new RegExp(`#${expected.iconId}`));
    }
  }

  async validateStoreLinks() {
    const container = this.getDivContainer(1);
    const listItems = container.locator('ul li');
  
    for (let i = 0; i < storeLinksData.stores.length; i++) {
      const expected = storeLinksData.stores[i];
      const link = listItems.nth(i).locator('a');
  
      await expect(link).toHaveAttribute('href', expected.href);
      await expect(link).toHaveAttribute('title', expected.title);
  
      const img = link.locator('img');
      const actualSrc = await img.getAttribute('src');

      expect(actualSrc).toContain(expected.imgSrc.split('?')[0]); // ignoramos el query param
      await expect(img).toHaveAttribute('alt', expected.alt);
      await expect(img).toHaveCount(1);
    }
  }
  
  async validateFooterLegalInfo() {
    const secondDiv = this.footer.locator('div').nth(1);
    const paragraphs = secondDiv.locator('p');
  
    let currentTextIndex = 0;
  
    for (let i = 0; i < await paragraphs.count(); i++) {
      const p = paragraphs.nth(i);
      const spans = p.locator('span');
  
      for (let j = 0; j < await spans.count(); j++) {
        const span = spans.nth(j);
        const expectedText = footerLegalInfo.texts[currentTextIndex];
  
        await expect(span).toHaveText(expectedText);
        currentTextIndex++;
      }
    }
  }

  async validateFooterLegalAndLogos() {
    const container = this.footer.locator('div.grid.text-center.text-initial_m');
    const pTags = container.locator('p');
  
    // Validar texto completo del copyright
    await expect(pTags.nth(0)).toHaveText(legalLinks.copyright);
  
    // Validar reCAPTCHA
    const recaptchaParagraph = pTags.nth(1);
    await expect(recaptchaParagraph.locator('b')).toHaveText(legalLinks.recaptcha.label);
  
    const recaptchaLinks = recaptchaParagraph.locator('a');
    for (let i = 0; i < legalLinks.recaptcha.links.length; i++) {
      const expected = legalLinks.recaptcha.links[i];
      const link = recaptchaLinks.nth(i);
  
      await expect(link).toHaveText(expected.text);
      await expect(link).toHaveAttribute('href', expected.href);
      await expect(link).toHaveAttribute('title', expected.title);
    }
  
    // Validar GDA
    const gdaLink = container.locator(`a[title="${legalLinks.gda.title}"]`);
    await expect(gdaLink).toHaveAttribute('href', legalLinks.gda.href);
    const gdaImg = gdaLink.locator('img');
    await expect(gdaImg).toHaveAttribute(
      'src',
      expect.stringContaining(legalLinks.gda.imgSrc.split('?')[0])
    );
    const gdaText = pTags.filter({ hasText: legalLinks.gda.text });
    await expect(gdaText).toHaveText(legalLinks.gda.text);
  
    // Validar AFIP
    const afipLink = container.locator(`a[title="${legalLinks.afip.title}"]`);
    await expect(afipLink).toHaveAttribute('href', legalLinks.afip.href);
    const afipImg = afipLink.locator('img');
    await expect(afipImg).toHaveAttribute(
      'src',
      expect.stringContaining(legalLinks.afip.imgSrc.split('?')[0])
    );    
  }

  async validateFooter(){
    await expect(this.footer).toBeVisible();
    await this.validateImgFooter();
    await this.validateSectionFooter();
    await this.validateFooterLinksGroups();
    await this.validateSocialMedia();
    await this.validateStoreLinks();
    await this.validateFooterLegalInfo();
    await this.validateFooterLegalAndLogos();
  }

  async validateMainArticle() {
    const article = this.page.locator('article.ln-card').first();
    await expect(article).toBeVisible();

    const title = article.locator('h1');
    await expect(title).toBeVisible();

    const img = article.locator('picture img');

    const imgExists = await img.count() > 0;

    if (!imgExists) {
      throw new Error('El artículo principal no contiene imagen.');
    }
  }  
}
