import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormsPage extends BasePage {
  private practiceFormLink: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private mobileNumberInput: Locator;
  private dateOfBirthInput: Locator;
  private subjectsInput: Locator;
  private currentAddressInput: Locator;
  private stateDropdown: Locator;
  private cityDropdown: Locator;
  private maleRadioButton: Locator;
  private femaleRadioButton: Locator;
  private otherRadioButton: Locator;
  private readingCheckbox: Locator;
  private musicCheckbox: Locator;
  private sportsCheckbox: Locator;
  private pictureUploadInput: Locator;
  private submitButton: Locator;
  private modalTitle: Locator;
  private modalBody: Locator;
  private closeModalButton: Locator;
  private closeLargeModalButton: Locator;
  private smallModalButton: Locator;
  private largeModalButton: Locator;
  private closeSmallModalButton: Locator;

  constructor(page: Page) {
    super(page);
    this.practiceFormLink = this.page.locator('text=Practice Form');
    this.firstNameInput = this.page.locator('#firstName');
    this.lastNameInput = this.page.locator('#lastName');
    this.emailInput = this.page.locator('#userEmail');
    this.mobileNumberInput = this.page.locator('#userNumber');
    this.dateOfBirthInput = this.page.locator('#dateOfBirthInput');
    this.subjectsInput = this.page.locator('#subjectsInput');
    this.currentAddressInput = this.page.locator('#currentAddress');
    this.stateDropdown = this.page.locator('#state');
    this.cityDropdown = this.page.locator('#city');
    this.maleRadioButton = this.page.locator('#gender-radio-1');
    this.femaleRadioButton = this.page.locator('#gender-radio-2');
    this.otherRadioButton = this.page.locator('#gender-radio-3');
    this.readingCheckbox = this.page.locator('#hobbies-checkbox-1');
    this.musicCheckbox = this.page.locator('#hobbies-checkbox-2');
    this.sportsCheckbox = this.page.locator('#hobbies-checkbox-3');
    this.pictureUploadInput = this.page.locator('#uploadPicture');
    this.submitButton = this.page.locator('#submit');
    this.modalTitle = this.page.locator('.modal-title');
    this.modalBody = this.page.locator('.modal-body');
    this.closeModalButton = this.page.locator('.close');
    this.closeLargeModalButton = this.page.locator('#closeLargeModal');
    this.smallModalButton = this.page.locator('#showSmallModal');
    this.largeModalButton = this.page.locator('#showLargeModal');
    this.closeSmallModalButton = this.page.locator('#closeSmallModal');
  }

  async navigateToPracticeForm(): Promise<void> {
    await this.practiceFormLink.click();
    await this.waitForPageLoad();
  }

  async fillPracticeForm(formData: {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    mobileNumber: string;
    dateOfBirth: string;
    subjects: string[];
    hobbies: string[];
    picturePath?: string;
    currentAddress: string;
    state: string;
    city: string;
  }): Promise<void> {
    await this.firstNameInput.fill(formData.firstName);
    await this.lastNameInput.fill(formData.lastName);
    await this.emailInput.fill(formData.email);

    if (formData.gender === 'Male') {
      await this.maleRadioButton.check();
    } else if (formData.gender === 'Female') {
      await this.femaleRadioButton.check();
    } else if (formData.gender === 'Other') {
      await this.otherRadioButton.check();
    }

    await this.mobileNumberInput.fill(formData.mobileNumber);
    await this.dateOfBirthInput.fill(formData.dateOfBirth);

    for (const subject of formData.subjects) {
      await this.subjectsInput.fill(subject);
      await this.page.keyboard.press('Enter');
    }

    for (const hobby of formData.hobbies) {
      if (hobby === 'Reading') {
        await this.readingCheckbox.check();
      } else if (hobby === 'Music') {
        await this.musicCheckbox.check();
      } else if (hobby === 'Sports') {
        await this.sportsCheckbox.check();
      }
    }

    if (formData.picturePath) {
      await this.pictureUploadInput.setInputFiles(formData.picturePath);
    }

    await this.currentAddressInput.fill(formData.currentAddress);

    await this.stateDropdown.click();
    await this.page.locator(`text=${formData.state}`).click();

    await this.cityDropdown.click();
    await this.page.locator(`text=${formData.city}`).click();
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async verifyFormSubmission(): Promise<void> {
    await expect(this.modalTitle).toContainText('Thanks for submitting the form');
  }

  async getModalBodyText(): Promise<string> {
    return await this.modalBody.textContent() || '';
  }

  async closeModal(): Promise<void> {
    await this.closeModalButton.click();
  }

  async closeLargeModal(): Promise<void> {
    await this.closeLargeModalButton.click();
  }

  async openSmallModal(): Promise<void> {
    await this.smallModalButton.click();
  }

  async openLargeModal(): Promise<void> {
    await this.largeModalButton.click();
  }

  async closeSmallModal(): Promise<void> {
    await this.closeSmallModalButton.click();
  }

  async verifyRequiredFieldValidation(): Promise<void> {
    await this.submitButton.click();
    await expect(this.firstNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  }
} 