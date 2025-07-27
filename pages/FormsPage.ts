import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormsPage extends BasePage {
  // Navigation elements
  readonly practiceFormLink: Locator;
  readonly formsHeader: Locator;

  // Practice Form elements
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly genderOtherRadio: Locator;
  readonly mobileNumberInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly subjectsInput: Locator;
  readonly hobbiesSportsCheckbox: Locator;
  readonly hobbiesReadingCheckbox: Locator;
  readonly hobbiesMusicCheckbox: Locator;
  readonly pictureUploadInput: Locator;
  readonly currentAddressTextarea: Locator;
  readonly stateDropdown: Locator;
  readonly cityDropdown: Locator;
  readonly submitButton: Locator;

  // Modal elements
  readonly modalTitle: Locator;
  readonly modalCloseButton: Locator;
  readonly modalStudentName: Locator;
  readonly modalStudentEmail: Locator;
  readonly modalGender: Locator;
  readonly modalMobile: Locator;
  readonly modalDateOfBirth: Locator;
  readonly modalSubjects: Locator;
  readonly modalHobbies: Locator;
  readonly modalPicture: Locator;
  readonly modalAddress: Locator;
  readonly modalStateAndCity: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize navigation locators
    this.practiceFormLink = page.locator('span.text').filter({ hasText: 'Practice Form' });
    this.formsHeader = page.locator('.main-header').filter({ hasText: 'Forms' });

    // Initialize Practice Form locators
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderMaleRadio = page.locator('#gender-radio-1');
    this.genderFemaleRadio = page.locator('#gender-radio-2');
    this.genderOtherRadio = page.locator('#gender-radio-3');
    this.mobileNumberInput = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.hobbiesSportsCheckbox = page.locator('#hobbies-checkbox-1');
    this.hobbiesReadingCheckbox = page.locator('#hobbies-checkbox-2');
    this.hobbiesMusicCheckbox = page.locator('#hobbies-checkbox-3');
    this.pictureUploadInput = page.locator('#uploadPicture');
    this.currentAddressTextarea = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitButton = page.locator('#submit');

    // Initialize modal locators
    this.modalTitle = page.locator('.modal-title');
    this.modalCloseButton = page.locator('#closeLargeModal');
    this.modalStudentName = page.locator('td', { hasText: 'Student Name' }).locator('..').locator('td').nth(1);
    this.modalStudentEmail = page.locator('td', { hasText: 'Student Email' }).locator('..').locator('td').nth(1);
    this.modalGender = page.locator('td', { hasText: 'Gender' }).locator('..').locator('td').nth(1);
    this.modalMobile = page.locator('td', { hasText: 'Mobile' }).locator('..').locator('td').nth(1);
    this.modalDateOfBirth = page.locator('td', { hasText: 'Date of Birth' }).locator('..').locator('td').nth(1);
    this.modalSubjects = page.locator('td', { hasText: 'Subjects' }).locator('..').locator('td').nth(1);
    this.modalHobbies = page.locator('td', { hasText: 'Hobbies' }).locator('..').locator('td').nth(1);
    this.modalPicture = page.locator('td', { hasText: 'Picture' }).locator('..').locator('td').nth(1);
    this.modalAddress = page.locator('td', { hasText: 'Address' }).locator('..').locator('td').nth(1);
    this.modalStateAndCity = page.locator('td', { hasText: 'State and City' }).locator('..').locator('td').nth(1);
  }

  /**
   * Navigate to Practice Form
   */
  async navigateToPracticeForm() {
    await this.scrollToElement(this.practiceFormLink);
    await this.clickWithRetry(this.practiceFormLink);
  }

  /**
   * Fill the practice form with provided data
   */
  async fillPracticeForm(formData: {
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
  }) {
    // Fill basic information
    await this.fillWithRetry(this.firstNameInput, formData.firstName);
    await this.fillWithRetry(this.lastNameInput, formData.lastName);
    await this.fillWithRetry(this.emailInput, formData.email);

    // Select gender
    switch (formData.gender) {
      case 'Male':
        await this.clickWithRetry(this.genderMaleRadio);
        break;
      case 'Female':
        await this.clickWithRetry(this.genderFemaleRadio);
        break;
      case 'Other':
        await this.clickWithRetry(this.genderOtherRadio);
        break;
    }

    // Fill mobile number
    await this.fillWithRetry(this.mobileNumberInput, formData.mobileNumber);

    // Fill date of birth
    await this.fillWithRetry(this.dateOfBirthInput, formData.dateOfBirth);
    await this.page.keyboard.press('Enter');

    // Fill subjects
    for (const subject of formData.subjects) {
      await this.fillWithRetry(this.subjectsInput, subject);
      await this.page.keyboard.press('Enter');
    }

    // Select hobbies
    for (const hobby of formData.hobbies) {
      switch (hobby.toLowerCase()) {
        case 'sports':
          await this.clickWithRetry(this.hobbiesSportsCheckbox);
          break;
        case 'reading':
          await this.clickWithRetry(this.hobbiesReadingCheckbox);
          break;
        case 'music':
          await this.clickWithRetry(this.hobbiesMusicCheckbox);
          break;
      }
    }

    // Upload picture if provided
    if (formData.picturePath) {
      await this.pictureUploadInput.setInputFiles(formData.picturePath);
    }

    // Fill current address
    await this.fillWithRetry(this.currentAddressTextarea, formData.currentAddress);

    // Select state and city
    await this.selectState(formData.state);
    await this.selectCity(formData.city);
  }

  /**
   * Select state from dropdown
   */
  async selectState(state: string) {
    await this.clickWithRetry(this.stateDropdown);
    await this.page.locator(`text=${state}`).click();
  }

  /**
   * Select city from dropdown
   */
  async selectCity(city: string) {
    await this.clickWithRetry(this.cityDropdown);
    await this.page.locator(`text=${city}`).click();
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.clickWithRetry(this.submitButton);
  }

  /**
   * Verify modal is displayed
   */
  async verifyModalIsDisplayed() {
    await this.waitForElement(this.modalTitle);
  }

  /**
   * Get modal data
   */
  async getModalData() {
    return {
      studentName: await this.getText(this.modalStudentName),
      studentEmail: await this.getText(this.modalStudentEmail),
      gender: await this.getText(this.modalGender),
      mobile: await this.getText(this.modalMobile),
      dateOfBirth: await this.getText(this.modalDateOfBirth),
      subjects: await this.getText(this.modalSubjects),
      hobbies: await this.getText(this.modalHobbies),
      picture: await this.getText(this.modalPicture),
      address: await this.getText(this.modalAddress),
      stateAndCity: await this.getText(this.modalStateAndCity)
    };
  }

  /**
   * Close modal
   */
  async closeModal() {
    await this.clickWithRetry(this.modalCloseButton);
  }

  /**
   * Verify form validation errors
   */
  async verifyFormValidation() {
    // Check if required fields show validation errors
    const firstNameValidation = await this.firstNameInput.evaluate(el => 
      (el as HTMLInputElement).validity.valid
    );
    
    if (firstNameValidation) {
      throw new Error('First name validation should fail when empty');
    }
  }
} 