import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { KeyboardInteractionComponent } from '../components/KeyboardInteractionComponent';

export class TextBoxPage extends BasePage {
  private _keyboardInteraction: KeyboardInteractionComponent;

  constructor(page: Page) {
    super(page);
    this._keyboardInteraction = new KeyboardInteractionComponent(page);
  }

  get fullNameInput(): Locator {
    return this.page.locator('#userName');
  }

  get emailInput(): Locator {
    return this.page.locator('#userEmail');
  }

  get currentAddressInput(): Locator {
    return this.page.locator('#currentAddress');
  }

  get permanentAddressInput(): Locator {
    return this.page.locator('#permanentAddress');
  }

  get submitButton(): Locator {
    return this.page.locator('#submit');
  }

  get outputName(): Locator {
    return this.page.locator('#name');
  }

  get outputEmail(): Locator {
    return this.page.locator('#email');
  }

  get outputCurrentAddress(): Locator {
    return this.page.locator('#currentAddress').nth(1);
  }

  get outputPermanentAddress(): Locator {
    return this.page.locator('#permanentAddress').nth(1);
  }

  get keyboardInteraction(): KeyboardInteractionComponent {
    return this._keyboardInteraction;
  }

  async verifyElementNotFocused(element: Locator): Promise<void> {
    await this._keyboardInteraction.verifyElementNotFocused(element);
  }

  async navigateToTextBox(): Promise<void> {
    await this.navigateTo('/text-box');
  }

  async fillFullNameWithKeyboard(text: string): Promise<void> {
    await this._keyboardInteraction.fillTextOnElement(this.fullNameInput, text);
  }

  async fillEmailWithKeyboard(text: string): Promise<void> {
    await this._keyboardInteraction.fillTextOnElement(this.emailInput, text);
  }

  async fillCurrentAddressWithKeyboard(text: string): Promise<void> {
    await this._keyboardInteraction.fillTextOnElement(this.currentAddressInput, text);
  }

  async fillPermanentAddressWithKeyboard(text: string): Promise<void> {
    await this._keyboardInteraction.fillTextOnElement(this.permanentAddressInput, text);
  }

  async submitWithEnterKey(): Promise<void> {
    await this._keyboardInteraction.pressKeyOnElement(this.submitButton, 'Enter');
  }

  async submitWithSpaceKey(): Promise<void> {
    await this._keyboardInteraction.pressKeyOnElement(this.submitButton, ' ');
  }

  async navigateFormWithTab(): Promise<void> {
    const formElements = [
      this.fullNameInput,
      this.emailInput,
      this.currentAddressInput,
      this.permanentAddressInput,
      this.submitButton
    ];
    await this._keyboardInteraction.navigateWithTab(formElements);
  }

  async selectAllTextInFullName(): Promise<void> {
    await this._keyboardInteraction.selectAllText(this.fullNameInput);
  }

  async copyTextFromFullName(): Promise<void> {
    await this._keyboardInteraction.copyText(this.fullNameInput);
  }

  async pasteTextToEmail(): Promise<void> {
    await this._keyboardInteraction.pasteText(this.emailInput);
  }

  async clearTextWithKeyboard(element: Locator): Promise<void> {
    await this._keyboardInteraction.clearTextWithKeyboard(element);
  }

  async deleteTextFromElement(element: Locator): Promise<void> {
    await this._keyboardInteraction.deleteText(element);
  }

  async backspaceTextFromElement(element: Locator): Promise<void> {
    await this._keyboardInteraction.backspaceText(element);
  }

  async verifyOutputName(expectedText: string): Promise<void> {
    await expect(this.outputName).toContainText(expectedText);
  }

  async verifyOutputEmail(expectedText: string): Promise<void> {
    await expect(this.outputEmail).toContainText(expectedText);
  }

  async verifyOutputCurrentAddress(expectedText: string): Promise<void> {
    await expect(this.outputCurrentAddress).toContainText(expectedText);
  }

  async verifyOutputPermanentAddress(expectedText: string): Promise<void> {
    await expect(this.outputPermanentAddress).toContainText(expectedText);
  }

  async verifyElementFocused(element: Locator): Promise<void> {
    await this._keyboardInteraction.verifyElementFocused(element);
  }

  async measureKeyboardPerformance(operation: () => Promise<void>): Promise<number> {
    return await this._keyboardInteraction.measureKeyboardInteractionPerformance(operation);
  }

  async testBasicKeyboardNavigation(): Promise<void> {
    await this.navigateFormWithTab();
    await this.verifyElementFocused(this.submitButton);
  }

  async testKeyboardTextInput(): Promise<void> {
    const testText = 'John Doe';
    await this.fillFullNameWithKeyboard(testText);
    await expect(this.fullNameInput).toHaveValue(testText);
  }

  async testKeyboardCopyPaste(): Promise<void> {
    const testText = 'Test User';
    await this.fillFullNameWithKeyboard(testText);
    await this.selectAllTextInFullName();
    await this.copyTextFromFullName();
    await this.pasteTextToEmail();
    await expect(this.emailInput).toHaveValue(testText);
  }

  async testKeyboardTextDeletion(): Promise<void> {
    const testText = 'Text to delete';
    await this.fillFullNameWithKeyboard(testText);
    await this.clearTextWithKeyboard(this.fullNameInput);
    await expect(this.fullNameInput).toHaveValue('');
  }

  async testKeyboardFormSubmission(): Promise<void> {
    await this.fillFullNameWithKeyboard('John Doe');
    await this.fillEmailWithKeyboard('john@example.com');
    await this.fillCurrentAddressWithKeyboard('123 Main St');
    await this.fillPermanentAddressWithKeyboard('456 Oak Ave');
    await this.submitWithEnterKey();
    await this.verifyOutputName('John Doe');
  }
} 