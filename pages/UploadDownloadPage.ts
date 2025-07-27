import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { FileUploadComponent } from '../components/FileUploadComponent';
import { FILE_UPLOAD_SELECTORS } from '../data/fileUploadTestData';
import { join } from 'path';
import * as path from 'path';

export class UploadDownloadPage extends BasePage {
  private _fileUpload: FileUploadComponent;

  constructor(page: Page) {
    super(page);
    this._fileUpload = new FileUploadComponent(page);
  }

  get fileInput(): Locator {
    return this.page.locator(FILE_UPLOAD_SELECTORS.fileInput);
  }

  get downloadLink(): Locator {
    return this.page.locator(FILE_UPLOAD_SELECTORS.downloadLink);
  }

  get uploadMessage(): Locator {
    return this.page.locator(FILE_UPLOAD_SELECTORS.uploadMessage);
  }

  get dropZone(): Locator {
    return this.page.locator(FILE_UPLOAD_SELECTORS.dropZone);
  }

  get fileList(): Locator {
    return this.page.locator(FILE_UPLOAD_SELECTORS.fileList);
  }

  get uploadButton(): Locator {
    return this.page.locator(FILE_UPLOAD_SELECTORS.uploadButton);
  }

  get clearButton(): Locator {
    return this.page.locator(FILE_UPLOAD_SELECTORS.clearButton);
  }

  get fileUpload(): FileUploadComponent {
    return this._fileUpload;
  }

  async navigateToUploadDownload(): Promise<void> {
    await this.navigateTo('/upload-download');
  }

  async uploadSingleFile(filePath: string): Promise<void> {
    await this._fileUpload.uploadFile(this.fileInput, filePath);
  }

  async dragAndDropFile(filePath: string): Promise<void> {
    await this._fileUpload.dragAndDropFile(this.dropZone, filePath);
  }

  async verifyFileUploaded(expectedFileName: string): Promise<void> {
    await this._fileUpload.verifyFileUploaded(this.fileInput, expectedFileName);
  }

  async verifyFileSize(expectedSize: number): Promise<void> {
    await this._fileUpload.verifyFileSize(this.fileInput, expectedSize);
  }

  async verifyFileType(expectedType: string): Promise<void> {
    await this._fileUpload.verifyFileType(this.fileInput, expectedType);
  }

  async clearFileInput(): Promise<void> {
    await this._fileUpload.clearFileInput(this.fileInput);
  }

  async verifyUploadSuccessMessage(expectedMessage: string): Promise<void> {
    await this._fileUpload.verifyUploadSuccessMessage(this.uploadMessage, expectedMessage);
  }

  async verifyDownloadLink(expectedFileName: string): Promise<void> {
    await this._fileUpload.verifyDownloadLink(this.downloadLink);
  }

  async downloadFile(): Promise<string> {
    return await this._fileUpload.downloadFile(this.downloadLink);
  }

  async testDownloadWorkflow(expectedFileName: string): Promise<void> {
    await this._fileUpload.testDownloadWorkflow(this.downloadLink, expectedFileName);
  }

  async testFileUploadWithValidation(filePath: string, expectedFileName: string, expectedSize: number, expectedType: string): Promise<void> {
    await this._fileUpload.testFileUploadWithValidation(this.fileInput, filePath, expectedFileName, expectedSize, expectedType);
  }

  async testDataDrivenFileUpload(fileType: { name: string; file: any; description: string }): Promise<void> {
    const filePath = path.join(__dirname, `../test-files/${fileType.file.name}`);
    await this.testFileUploadWithValidation(
      filePath,
      fileType.file.name,
      fileType.file.size,
      fileType.file.type
    );
  }

  async measureUploadPerformance(uploadOperation: () => Promise<void>): Promise<number> {
    return await this._fileUpload.measureUploadPerformance(uploadOperation);
  }

  async verifyFileInputEmpty(): Promise<void> {
    await this._fileUpload.verifyFileInputEmpty(this.fileInput);
  }

  async getUploadedFileName(): Promise<string> {
    return await this._fileUpload.getUploadedFileName(this.fileInput);
  }

  async getUploadedFileSize(): Promise<number> {
    return await this._fileUpload.getUploadedFileSize(this.fileInput);
  }

  async getUploadedFileType(): Promise<string> {
    return await this._fileUpload.getUploadedFileType(this.fileInput);
  }

  async testBasicFileUpload(filePath: string, expectedFileName: string): Promise<void> {
    await this.uploadSingleFile(filePath);
    await this.verifyFileUploaded(expectedFileName);
  }

  async testFileUploadPerformance(filePath: string, maxDuration: number): Promise<void> {
    const duration = await this.measureUploadPerformance(async () => {
      await this.uploadSingleFile(filePath);
    });
    expect(duration).toBeLessThan(maxDuration);
  }

  async testDownloadFunctionality(expectedFileName: string): Promise<void> {
    await this.verifyDownloadLink(expectedFileName);
    const downloadPath = await this.downloadFile();
    expect(downloadPath).toBeTruthy();
  }

  async testClearFileInput(): Promise<void> {
    const filePath = join(__dirname, '../test-files/small-text.txt');
    await this.uploadSingleFile(filePath);
    await this.clearFileInput();
    await this.verifyFileInputEmpty();
  }

  async testDragAndDropUpload(filePath: string, expectedFileName: string): Promise<void> {
    await this.dragAndDropFile(filePath);
    await this.verifyFileUploaded(expectedFileName);
  }
} 