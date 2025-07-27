import { Page, Locator } from '@playwright/test';

export class FileUploadComponent {
  constructor(private page: Page) {}

  async uploadFile(fileInput: Locator, filePath: string): Promise<void> {
    await fileInput.setInputFiles(filePath);
  }

  async dragAndDropFile(dropZone: Locator, filePath: string): Promise<void> {
    await dropZone.setInputFiles(filePath);
  }

  async verifyFileUploaded(fileInput: Locator, expectedFileName: string): Promise<void> {
    const fileName = await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.name || '';
    });
    if (fileName !== expectedFileName) {
      throw new Error(`Expected file name "${expectedFileName}", but got "${fileName}"`);
    }
  }

  async verifyFileSize(fileInput: Locator, expectedSize: number): Promise<void> {
    const fileSize = await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.size || 0;
    });
    if (fileSize !== expectedSize) {
      throw new Error(`Expected file size ${expectedSize}, but got ${fileSize}`);
    }
  }

  async verifyFileType(fileInput: Locator, expectedType: string): Promise<void> {
    const fileType = await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.type || '';
    });
    if (fileType !== expectedType) {
      throw new Error(`Expected file type "${expectedType}", but got "${fileType}"`);
    }
  }

  async clearFileInput(fileInput: Locator): Promise<void> {
    await fileInput.setInputFiles([]);
  }

  async verifyUploadSuccessMessage(messageLocator: Locator, expectedMessage: string): Promise<void> {
    await messageLocator.waitFor({ state: 'visible' });
    const actualMessage = await messageLocator.textContent();
    if (actualMessage?.trim() !== expectedMessage.trim()) {
      throw new Error(`Expected message "${expectedMessage}", but got "${actualMessage}"`);
    }
  }

  async verifyDownloadLink(downloadLink: Locator): Promise<void> {
    await downloadLink.waitFor({ state: 'visible' });
    const href = await downloadLink.getAttribute('href');
    if (!href) {
      throw new Error('Download link does not have href attribute');
    }
  }

  async downloadFile(downloadLink: Locator): Promise<string> {
    const downloadPromise = this.page.waitForEvent('download');
    await downloadLink.click();
    const download = await downloadPromise;
    const path = await download.path();
    return path || '';
  }

  async verifyDownloadedFile(downloadPath: string, expectedFileName: string): Promise<void> {
    if (!downloadPath) {
      throw new Error('Download path is empty');
    }
    const fileName = downloadPath.split('/').pop() || downloadPath.split('\\').pop();
    if (!fileName) {
      throw new Error('Could not extract filename from download path');
    }
    console.log(`Downloaded file: ${fileName}, Expected: ${expectedFileName}`);
  }

  async measureUploadPerformance(uploadOperation: () => Promise<void>): Promise<number> {
    const startTime = Date.now();
    await uploadOperation();
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyFileInputEmpty(fileInput: Locator): Promise<void> {
    const fileCount = await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.length || 0;
    });
    if (fileCount !== 0) {
      throw new Error(`Expected file input to be empty, but found ${fileCount} files`);
    }
  }

  async getUploadedFileName(fileInput: Locator): Promise<string> {
    return await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.name || '';
    });
  }

  async getUploadedFileSize(fileInput: Locator): Promise<number> {
    return await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.size || 0;
    });
  }

  async getUploadedFileType(fileInput: Locator): Promise<string> {
    return await fileInput.evaluate((el: HTMLInputElement) => {
      return el.files?.[0]?.type || '';
    });
  }

  async testFileUploadWithValidation(fileInput: Locator, filePath: string, expectedFileName: string, expectedSize: number, expectedType: string): Promise<void> {
    await this.uploadFile(fileInput, filePath);
    await this.verifyFileUploaded(fileInput, expectedFileName);
    await this.verifyFileSize(fileInput, expectedSize);
    await this.verifyFileType(fileInput, expectedType);
  }

  async testDownloadWorkflow(downloadLink: Locator, expectedFileName: string): Promise<void> {
    await this.verifyDownloadLink(downloadLink);
    const downloadPath = await this.downloadFile(downloadLink);
    await this.verifyDownloadedFile(downloadPath, expectedFileName);
  }
} 