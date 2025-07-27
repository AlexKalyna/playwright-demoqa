export const KEYBOARD_SELECTORS = {
  fullName: '#userName',
  email: '#userEmail',
  currentAddress: '#currentAddress',
  permanentAddress: '#permanentAddress',
  submit: '#submit',
  outputName: '#name',
  outputEmail: '#email',
  outputCurrentAddress: '#currentAddress',
  outputPermanentAddress: '#permanentAddress'
} as const;

export const KEYBOARD_KEYS = {
  enter: 'Enter',
  space: ' ',
  tab: 'Tab',
  escape: 'Escape',
  backspace: 'Backspace',
  delete: 'Delete',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  home: 'Home',
  end: 'End',
  pageUp: 'PageUp',
  pageDown: 'PageDown'
} as const;

export const KEYBOARD_MODIFIERS = {
  control: 'Control',
  shift: 'Shift',
  alt: 'Alt',
  meta: 'Meta'
} as const;

export const KEYBOARD_SHORTCUTS = {
  selectAll: { key: 'a', modifier: 'Control' },
  copy: { key: 'c', modifier: 'Control' },
  paste: { key: 'v', modifier: 'Control' },
  cut: { key: 'x', modifier: 'Control' },
  undo: { key: 'z', modifier: 'Control' },
  redo: { key: 'y', modifier: 'Control' },
  save: { key: 's', modifier: 'Control' },
  find: { key: 'f', modifier: 'Control' }
} as const;

export const TEST_TEXT_DATA = {
  fullName: 'John Doe',
  email: 'john.doe@example.com',
  currentAddress: '123 Main Street, City, State 12345',
  permanentAddress: '456 Oak Avenue, Town, Province 67890',
  longText: 'This is a very long text that should test keyboard input performance and text handling capabilities of the application',
  specialCharacters: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  numbers: '1234567890',
  mixedContent: 'Text123!@#Mixed456Content789'
} as const;

export const PERFORMANCE_THRESHOLDS = {
  keyboardInput: 1000,
  navigation: 500,
  copyPaste: 800,
  textDeletion: 300,
  formSubmission: 2000
} as const;

export const EXPECTED_BEHAVIORS = {
  tabNavigation: 'Should navigate through form elements in order',
  enterSubmission: 'Should submit form when Enter is pressed on submit button',
  spaceSubmission: 'Should submit form when Space is pressed on submit button',
  copyPaste: 'Should copy text from one field and paste to another',
  textDeletion: 'Should delete text using keyboard shortcuts',
  selectAll: 'Should select all text in input field',
  focusManagement: 'Should properly manage focus between elements'
} as const; 