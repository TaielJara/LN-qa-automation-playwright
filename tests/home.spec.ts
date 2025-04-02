import { test } from '@playwright/test';
import { HomePage } from '../pages/ui/home.page';
import { NetworkService } from '../pages/services/network.service';


test.describe('Home de La Nación', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.navigate();
    await home.closeComercialWindow();
    await home.closeModal();
  });

  test('El header se muestra correctamente', async () => {
    await home.validateTitleText();
    await home.validateHeader(true);
    await home.validateDollarLinks();
    await home.validateAccessLinks();
    await home.validateButtons();
  });

  test('El footer se muestra correctamente', async () => {
    await home.validateFooter();
  });

  test('Se visualiza el artículo principal con título e imagen', async () => {
    await home.validateMainArticle();
  });

  test('Verificamos las respuestas de los request de la pagina', async ({ page }) => {
    const network = new NetworkService(page);
    await network.validateLanacionRequests();
  });
});
