export interface FormTestData {
  firstName: string;
  lastName: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  mobileNumber: string;
  dateOfBirth: string;
  subjects: string[];
  hobbies: string[];
  picturePath?: string;
  currentAddress: string;
  state: string;
  city: string;
}

export const validFormData: FormTestData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  gender: 'Male',
  mobileNumber: '1234567890',
  dateOfBirth: '15 Jan 1990',
  subjects: ['Maths', 'Physics'],
  hobbies: ['Sports', 'Reading'],
  currentAddress: '123 Main Street, New York, NY 10001',
  state: 'NCR',
  city: 'Delhi'
};

export const validFormData2: FormTestData = {
  firstName: 'Jane',
  lastName: 'Smith',
  email: 'jane.smith@example.com',
  gender: 'Female',
  mobileNumber: '9876543210',
  dateOfBirth: '20 Mar 1985',
  subjects: ['Chemistry', 'Biology'],
  hobbies: ['Music'],
  currentAddress: '456 Oak Avenue, Los Angeles, CA 90210',
  state: 'Uttar Pradesh',
  city: 'Agra'
};

export const invalidFormData = {
  firstName: '',
  lastName: '',
  email: 'invalid-email',
  gender: 'Male' as const,
  mobileNumber: '123', // Too short
  dateOfBirth: '15 Jan 1990',
  subjects: [] as string[],
  hobbies: [] as string[],
  currentAddress: '',
  state: 'NCR',
  city: 'Delhi'
};

export const expectedCardTitles = [
  'Elements',
  'Forms',
  'Alerts, Frame & Windows',
  'Widgets',
  'Interactions',
  'Book Store Application'
];

export const testUrls = {
  home: 'https://demoqa.com',
  elements: 'https://demoqa.com/elements',
  forms: 'https://demoqa.com/forms',
  alertsFrameWindows: 'https://demoqa.com/alertsWindows',
  widgets: 'https://demoqa.com/widgets',
  interactions: 'https://demoqa.com/interaction',
  bookStore: 'https://demoqa.com/books'
}; 