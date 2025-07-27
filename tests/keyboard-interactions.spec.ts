import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';
import { PERFORMANCE_THRESHOLDS, TEST_TEXT_DATA } from '../data/keyboardTestData';

test.describe('Keyboard Interactions', () => {
  let textBoxPage: TextBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigateToTextBox();
  });

  test('should test basic keyboard navigation with Tab key', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.testBasicKeyboardNavigation();
  });

  test('should test keyboard text input functionality', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.testKeyboardTextInput();
  });

  test('should test form submission with Enter key', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.testKeyboardFormSubmission();
  });

  test('should test form submission with Space key', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard('Jane Smith');
    await textBoxPage.fillEmailWithKeyboard('jane@example.com');
    await textBoxPage.fillCurrentAddressWithKeyboard('789 Pine Road');
    await textBoxPage.fillPermanentAddressWithKeyboard('321 Elm Street');
    await textBoxPage.submitWithSpaceKey();
    await textBoxPage.verifyOutputName('Jane Smith');
  });

  test('should test keyboard input with special characters', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard(TEST_TEXT_DATA.specialCharacters);
    await expect(textBoxPage.fullNameInput).toHaveValue(TEST_TEXT_DATA.specialCharacters);
  });

  test('should test keyboard input with numbers', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillEmailWithKeyboard(TEST_TEXT_DATA.numbers);
    await expect(textBoxPage.emailInput).toHaveValue(TEST_TEXT_DATA.numbers);
  });

  test('should test keyboard input with mixed content', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillCurrentAddressWithKeyboard(TEST_TEXT_DATA.mixedContent);
    await expect(textBoxPage.currentAddressInput).toHaveValue(TEST_TEXT_DATA.mixedContent);
  });

  test('should test keyboard input with long text', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillPermanentAddressWithKeyboard(TEST_TEXT_DATA.longText);
    await expect(textBoxPage.permanentAddressInput).toHaveValue(TEST_TEXT_DATA.longText);
  });

  test('should test keyboard performance for text input', { tag: '@keyboard-interactions' }, async () => {
    const duration = await textBoxPage.measureKeyboardPerformance(async () => {
      await textBoxPage.fillFullNameWithKeyboard(TEST_TEXT_DATA.fullName);
    });
    expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.keyboardInput);
  });

  test('should test keyboard performance for form submission', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard(TEST_TEXT_DATA.fullName);
    await textBoxPage.fillEmailWithKeyboard(TEST_TEXT_DATA.email);
    await textBoxPage.fillCurrentAddressWithKeyboard(TEST_TEXT_DATA.currentAddress);
    await textBoxPage.fillPermanentAddressWithKeyboard(TEST_TEXT_DATA.permanentAddress);
    
    const duration = await textBoxPage.measureKeyboardPerformance(async () => {
      await textBoxPage.submitWithEnterKey();
    });
    expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.formSubmission);
  });

  test('should test backspace key functionality', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard('Test User');
    await textBoxPage.backspaceTextFromElement(textBoxPage.fullNameInput);
    await expect(textBoxPage.fullNameInput).toHaveValue('Test Use');
  });

  test('should test delete key functionality', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard('Test User');
    await textBoxPage.fullNameInput.focus();
    await textBoxPage.keyboardInteraction.pressKey('ArrowLeft');
    await textBoxPage.deleteTextFromElement(textBoxPage.fullNameInput);
    await expect(textBoxPage.fullNameInput).toHaveValue('Test Use');
  });

  test('should test arrow key navigation in text fields', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard('Test');
    await textBoxPage.fullNameInput.focus();
    
    await textBoxPage.keyboardInteraction.pressKey('ArrowLeft');
    await textBoxPage.keyboardInteraction.pressKey('ArrowRight');
    await textBoxPage.keyboardInteraction.pressKey('ArrowUp');
    await textBoxPage.keyboardInteraction.pressKey('ArrowDown');
    
    await expect(textBoxPage.fullNameInput).toHaveValue('Test');
  });

  test('should test home and end key functionality', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard('Test User');
    await textBoxPage.fullNameInput.focus();
    
    await textBoxPage.keyboardInteraction.pressKey('End');
    await textBoxPage.keyboardInteraction.pressKey('Home');
    
    await expect(textBoxPage.fullNameInput).toHaveValue('Test User');
  });

  test('should test escape key functionality', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard('Test User');
    await textBoxPage.fullNameInput.focus();
    await textBoxPage.keyboardInteraction.pressKey('Escape');
    await textBoxPage.verifyElementNotFocused(textBoxPage.fullNameInput);
  });

  test('should test keyboard input with shift modifier', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fullNameInput.focus();
    await textBoxPage.keyboardInteraction.pressKeyWithModifier('a', 'Shift');
    await textBoxPage.keyboardInteraction.fillText(textBoxPage.fullNameInput, 'A');
    await expect(textBoxPage.fullNameInput).toHaveValue('A');
  });

  test('should test keyboard input with alt modifier', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fullNameInput.focus();
    await textBoxPage.keyboardInteraction.pressKeyWithModifier('a', 'Alt');
    await expect(textBoxPage.fullNameInput).toBeVisible();
  });

  test('should test keyboard input with page up and page down', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillCurrentAddressWithKeyboard('Test Address');
    await textBoxPage.currentAddressInput.focus();
    
    await textBoxPage.keyboardInteraction.pressKey('PageUp');
    await textBoxPage.keyboardInteraction.pressKey('PageDown');
    
    await expect(textBoxPage.currentAddressInput).toHaveValue('Test Address');
  });

  test('should test keyboard input with multiple rapid key presses', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fullNameInput.focus();
    
    for (let i = 0; i < 10; i++) {
      await textBoxPage.keyboardInteraction.pressKey('a');
    }
    
    await expect(textBoxPage.fullNameInput).toHaveValue('a'.repeat(10));
  });

  test('should test keyboard input with special key combinations', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fillFullNameWithKeyboard('Test');
    await textBoxPage.fullNameInput.focus();
    
    await textBoxPage.keyboardInteraction.pressKey('End');
    await textBoxPage.keyboardInteraction.pressKey('Backspace');
    await textBoxPage.keyboardInteraction.pressKey('Delete');
    
    await expect(textBoxPage.fullNameInput).toHaveValue('Tes');
  });

  test('should test keyboard input with focus management', { tag: '@keyboard-interactions' }, async () => {
    await textBoxPage.fullNameInput.focus();
    await textBoxPage.verifyElementFocused(textBoxPage.fullNameInput);
    
    await textBoxPage.emailInput.focus();
    await textBoxPage.verifyElementFocused(textBoxPage.emailInput);
    
    await textBoxPage.currentAddressInput.focus();
    await textBoxPage.verifyElementFocused(textBoxPage.currentAddressInput);
    
    await textBoxPage.permanentAddressInput.focus();
    await textBoxPage.verifyElementFocused(textBoxPage.permanentAddressInput);
  });
}); 