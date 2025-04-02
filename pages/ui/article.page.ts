import { Page, Locator, expect } from '@playwright/test';
import paragraphData from '../../data/paragraphs.json';

export class ArticlePage {
  readonly page: Page;
  readonly title: Locator;
  readonly main: Locator;
  readonly paragraphs: Locator;
  readonly header: Locator;
  readonly sectionNote: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main = page.locator('main');
    this.title = this.main.locator('h1');
    this.header = page.locator('header.common-header');
    this.sectionNote = page.locator('section.cuerpo__nota');
  }

  async validateHeader(){
    const headerVisible = await this.header.isVisible();
    console.log('¿Header visible?', headerVisible);
  }



  async navigate() {
    await this.page.goto(
      'https://www.lanacion.com.ar/politica/tras-la-caida-de-la-moratoria-la-oposicion-desafia-al-gobierno-impulsa-una-jubilacion-proporcional-a-nid25032025/',
      { waitUntil: 'domcontentloaded', timeout: 60000 }
    );
  }

  async validateTitle() {
    await expect(this.title).toBeVisible();
    await expect(this.title).toHaveText(
      'Tras la caída de la moratoria | La oposición desafía al Gobierno: impulsa una jubilación proporcional a los años de aportes'
    );
  }

  async validateParagraphsContent() {
    const expectedParagraphs: string[] = paragraphData.paragraphs;
  
    for (let i = 0; i < expectedParagraphs.length; i++) {
      const paragraph = this.sectionNote.locator('p').nth(i);
      await expect(paragraph).toBeVisible();
      const text = await paragraph.innerText();
      expect(text.replace(/\s+/g, ' ').trim()).toContain(expectedParagraphs[i]);
    }
  }  
}