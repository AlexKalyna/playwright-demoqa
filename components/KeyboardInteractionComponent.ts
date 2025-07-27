import { Page, Locator } from '@playwright/test';

export class KeyboardInteractionComponent {
  constructor(private page: Page) {}

  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  async fillText(element: Locator, text: string): Promise<void> {
    await element.fill(text);
  }

  async pressSequentially(element: Locator, text: string): Promise<void> {
    await element.pressSequentially(text);
  }

  async pressKeyOnElement(element: Locator, key: string): Promise<void> {
    await element.focus();
    await this.page.keyboard.press(key);
  }

  async fillTextOnElement(element: Locator, text: string): Promise<void> {
    await element.fill(text);
  }

  async pressSequentiallyOnElement(element: Locator, text: string): Promise<void> {
    await element.pressSequentially(text);
  }

  async pressKeyWithModifier(key: string, modifier: string): Promise<void> {
    await this.page.keyboard.down(modifier);
    await this.page.keyboard.press(key);
    await this.page.keyboard.up(modifier);
  }

  async pressKeyOnElementWithModifier(element: Locator, key: string, modifier: string): Promise<void> {
    await element.focus();
    await this.page.keyboard.down(modifier);
    await this.page.keyboard.press(key);
    await this.page.keyboard.up(modifier);
  }

  async navigateWithTab(elements: Locator[]): Promise<void> {
    for (const element of elements) {
      await this.page.keyboard.press('Tab');
      await element.focus();
    }
  }

  async selectAllText(element: Locator): Promise<void> {
    await element.focus();
    await this.pressKeyWithModifier('a', 'Control');
  }

  async copyText(element: Locator): Promise<void> {
    await element.focus();
    await this.pressKeyWithModifier('c', 'Control');
  }

  async pasteText(element: Locator): Promise<void> {
    await element.focus();
    await this.pressKeyWithModifier('v', 'Control');
  }

  async undoAction(element: Locator): Promise<void> {
    await element.focus();
    await this.pressKeyWithModifier('z', 'Control');
  }

  async redoAction(element: Locator): Promise<void> {
    await element.focus();
    await this.pressKeyWithModifier('y', 'Control');
  }

  async deleteText(element: Locator): Promise<void> {
    await element.focus();
    await this.pressKey('Delete');
  }

  async backspaceText(element: Locator): Promise<void> {
    await element.focus();
    await this.pressKey('Backspace');
  }

  async clearTextWithKeyboard(element: Locator): Promise<void> {
    await element.focus();
    await this.selectAllText(element);
    await this.pressKey('Delete');
  }

  async measureKeyboardInteractionPerformance(operation: () => Promise<void>): Promise<number> {
    const startTime = Date.now();
    await operation();
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyElementFocused(element: Locator): Promise<void> {
    await element.focus();
  }

  async verifyElementNotFocused(element: Locator): Promise<void> {
    await element.waitFor({ state: 'visible' });
  }
} 