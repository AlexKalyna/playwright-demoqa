import { Page, Locator } from '@playwright/test';

export class MouseManipulationComponent {
  constructor(private page: Page) {}

  async hoverOnElement(element: Locator): Promise<void> {
    await element.hover();
  }

  async rightClickOnElement(element: Locator): Promise<void> {
    await element.click({ button: 'right' });
  }

  async doubleClickOnElement(element: Locator): Promise<void> {
    await element.dblclick();
  }

  async mouseDownAndUpOnElement(element: Locator): Promise<void> {
    await element.hover();
    await this.page.mouse.down();
    await this.page.mouse.up();
  }

  async scrollWithMouseWheel(deltaY: number): Promise<void> {
    await this.page.mouse.wheel(0, deltaY);
  }

  async moveMouseToPosition(x: number, y: number): Promise<void> {
    await this.page.mouse.move(x, y);
  }

  async clickWithKeyboardModifier(element: Locator, modifier: string): Promise<void> {
    await this.page.keyboard.down(modifier);
    await element.click();
    await this.page.keyboard.up(modifier);
  }

  async performMultipleClicks(element: Locator, count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await element.click();
    }
  }

  async hoverOnMultipleElements(elements: Locator[]): Promise<void> {
    for (const element of elements) {
      await element.hover();
    }
  }

  async measureMouseInteractionPerformance(operation: () => Promise<void>): Promise<number> {
    const startTime = Date.now();
    await operation();
    const endTime = Date.now();
    return endTime - startTime;
  }
} 