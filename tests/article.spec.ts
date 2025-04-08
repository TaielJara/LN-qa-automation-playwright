import { test } from '@playwright/test';
import { HomePage } from '../pages/ui/home.page';
import { ArticlePage } from '../pages/ui/article.page';
import { NetworkService } from '../pages/services/network.service';

test.describe('Página de artículo de La Nación', () => {
  let home: HomePage;
  let article: ArticlePage;
  let network: NetworkService;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    article = new ArticlePage(page);
    network = new NetworkService(page);
    await article.navigate();
    await home.waitForPageToBeReady();
  });

  test('El header del artículo se muestra correctamente', async () => {
    await home.validateHeader();
    await home.validateLogo();
    await home.validateButtons();
  });

  test('El footer del artículo se muestra correctamente', async () => {
    await home.validateFooter();
  });

  test('Se muestra el título de la nota y al menos un párrafo visible', async () => {
    await article.validateTitle();
    await article.validateParagraphsContent();
  });

  test('Verificamos las respuestas de los request de la pagina', async () => {
    await network.validateLanacionRequests();
  });
});
