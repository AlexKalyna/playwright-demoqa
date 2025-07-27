import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async reloadAndNavigate(path: string): Promise<void> {
    await this.page.reload();
    await this.navigateTo(path);
  }

  async setViewportSize(size: { width: number; height: number }): Promise<void> {
    await this.page.setViewportSize(size);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
} 