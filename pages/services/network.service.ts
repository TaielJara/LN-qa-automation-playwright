import { Page, expect } from '@playwright/test';

export class NetworkService {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async validateLanacionRequests() {
    const failedRequests: string[] = [];
  
    this.page.on('response', response => {
      const url = response.url();
      const isLanacion = url.includes('lanacion.com.ar');
  
      const isStatusValid = response.status() >= 200 && response.status() < 400;
  
      if (isLanacion && !isStatusValid) {
        failedRequests.push(`${url} → status ${response.status()}`);
      }
    });
  
    await this.page.waitForTimeout(3000);
    expect(failedRequests).toEqual([]);
  }
}
