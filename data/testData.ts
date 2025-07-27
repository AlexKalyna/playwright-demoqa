export const VALID_FORM_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  gender: 'Male',
  mobileNumber: '1234567890',
  dateOfBirth: '15 Jan 1990',
  subjects: ['Math', 'Physics'],
  hobbies: ['Reading', 'Music'],
  picturePath: './test-files/sample-image.jpg',
  currentAddress: '123 Main Street, City, State 12345',
  state: 'NCR',
  city: 'Delhi'
};

export const INVALID_FORM_DATA = {
  firstName: '',
  lastName: '',
  email: 'invalid-email',
  gender: 'Male',
  mobileNumber: '123',
  dateOfBirth: '15 Jan 1990',
  subjects: [],
  hobbies: [],
  currentAddress: '',
  state: 'NCR',
  city: 'Delhi'
};

export const PARTIAL_FORM_DATA = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  gender: 'Female',
  mobileNumber: '9876543210',
  dateOfBirth: '20 Mar 1985',
  subjects: ['Chemistry'],
  hobbies: ['Sports'],
  currentAddress: '456 Oak Avenue, Town, Province 67890',
  state: 'Uttar Pradesh',
  city: 'Agra'
};

export const TEST_URLS = {
  home: 'https://demoqa.com',
  elements: 'https://demoqa.com/elements',
  forms: 'https://demoqa.com/forms',
  alertsFrameWindows: 'https://demoqa.com/alertsWindows',
  widgets: 'https://demoqa.com/widgets',
  interactions: 'https://demoqa.com/interaction',
  bookStore: 'https://demoqa.com/books'
};

export const EXPECTED_PAGE_TITLES = {
  home: 'DEMOQA',
  elements: 'Elements',
  forms: 'Forms',
  alertsFrameWindows: 'Alerts, Frame & Windows',
  widgets: 'Widgets',
  interactions: 'Interactions',
  bookStore: 'Book Store'
};

export const VALIDATION_MESSAGES = {
  requiredField: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidMobile: 'Please enter a valid mobile number',
  invalidDate: 'Please enter a valid date'
}; 