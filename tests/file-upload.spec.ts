import { test, expect } from '@playwright/test';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import { PERFORMANCE_THRESHOLDS, TEST_FILES, EXPECTED_MESSAGES, DATA_DRIVEN_FILE_TYPES } from '../data/fileUploadTestData';
import * as path from 'path';

test.describe('File Upload and Download', () => {
  let uploadDownloadPage: UploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.navigateToUploadDownload();
  });

  test.describe('Basic File Upload', () => {
    test('should upload a single text file successfully', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.testBasicFileUpload(filePath, 'small-text.txt');
    });

    test('should upload a file with validation', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.testFileUploadWithValidation(
        filePath,
        'small-text.txt',
        TEST_FILES.smallText.size,
        TEST_FILES.smallText.type
      );
    });

    test('should verify file input is empty initially', { tag: '@file-upload' }, async () => {
      await uploadDownloadPage.verifyFileInputEmpty();
    });

    test('should clear file input after upload', { tag: '@file-upload' }, async () => {
      await uploadDownloadPage.testClearFileInput();
    });
  });

  test.describe('File Properties', () => {
    test('should get uploaded file name', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.uploadSingleFile(filePath);
      const fileName = await uploadDownloadPage.getUploadedFileName();
      expect(fileName).toBe('small-text.txt');
    });

    test('should get uploaded file size', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.uploadSingleFile(filePath);
      const fileSize = await uploadDownloadPage.getUploadedFileSize();
      expect(fileSize).toBeGreaterThan(0);
    });

    test('should get uploaded file type', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.uploadSingleFile(filePath);
      const fileType = await uploadDownloadPage.getUploadedFileType();
      expect(fileType).toBe(TEST_FILES.smallText.type);
    });

    test('should test file upload with different file types', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.uploadSingleFile(filePath);
      await uploadDownloadPage.verifyFileType('text/plain');
    });

    test('should test file upload with large content', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/large-text.txt');
      await uploadDownloadPage.uploadSingleFile(filePath);
      const fileSize = await uploadDownloadPage.getUploadedFileSize();
      expect(fileSize).toBeGreaterThan(TEST_FILES.smallText.size);
    });
  });

  test.describe('Upload Methods', () => {
    test('should test drag and drop file upload', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.testDragAndDropUpload(filePath, 'small-text.txt');
    });

    test('should verify upload success message', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.uploadSingleFile(filePath);
      await uploadDownloadPage.verifyUploadSuccessMessage(EXPECTED_MESSAGES.uploadSuccess);
    });

    test('should test sequential file uploads', { tag: '@file-upload' }, async () => {
      const filePath1 = path.join(__dirname, '../test-files/small-text.txt');
      const filePath2 = path.join(__dirname, '../test-files/test-document.txt');
      
      await uploadDownloadPage.uploadSingleFile(filePath1);
      await uploadDownloadPage.verifyFileUploaded('small-text.txt');
      
      await uploadDownloadPage.clearFileInput();
      await uploadDownloadPage.uploadSingleFile(filePath2);
      await uploadDownloadPage.verifyFileUploaded('test-document.txt');
    });
  });

  test.describe('Download Functionality', () => {
    test('should test download functionality', { tag: '@file-upload' }, async () => {
      await uploadDownloadPage.testDownloadWorkflow('sampleFile.jpeg');
    });

    test('should verify download link exists', { tag: '@file-upload' }, async () => {
      await uploadDownloadPage.verifyDownloadLink('sampleFile.jpeg');
    });

    test('should test download workflow with validation', { tag: '@file-upload' }, async () => {
      await uploadDownloadPage.testDownloadWorkflow('sampleFile.jpeg');
    });
  });

  test.describe('Performance Testing', () => {
    test('should measure upload performance for small file', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.testFileUploadPerformance(filePath, PERFORMANCE_THRESHOLDS.smallFileUpload);
    });

    test('should measure upload performance for large file', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/large-text.txt');
      await uploadDownloadPage.testFileUploadPerformance(filePath, PERFORMANCE_THRESHOLDS.largeFileUpload);
    });

    test('should measure download performance', { tag: '@file-upload' }, async () => {
      const duration = await uploadDownloadPage.measureUploadPerformance(async () => {
        await uploadDownloadPage.downloadFile();
      });
      expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.downloadOperation);
    });

    test('should test file upload with validation and performance', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      
      const duration = await uploadDownloadPage.measureUploadPerformance(async () => {
        await uploadDownloadPage.testFileUploadWithValidation(
          filePath,
          'small-text.txt',
          TEST_FILES.smallText.size,
          TEST_FILES.smallText.type
        );
      });
      
      expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.fileValidation);
    });

    test('should test download performance', { tag: '@file-upload' }, async () => {
      const duration = await uploadDownloadPage.measureUploadPerformance(async () => {
        await uploadDownloadPage.testDownloadWorkflow('sampleFile.jpeg');
      });
      expect(duration).toBeLessThan(PERFORMANCE_THRESHOLDS.downloadOperation);
    });
  });

  test.describe('Error Handling', () => {
    test('should test file upload with error handling', { tag: '@file-upload' }, async () => {
      await uploadDownloadPage.verifyFileInputEmpty();
      
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      await uploadDownloadPage.uploadSingleFile(filePath);
      
      await uploadDownloadPage.clearFileInput();
      await uploadDownloadPage.verifyFileInputEmpty();
    });
  });

  test.describe('Workflow Testing', () => {
    test('should test comprehensive file upload workflow', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      
      await uploadDownloadPage.verifyFileInputEmpty();
      await uploadDownloadPage.uploadSingleFile(filePath);
      await uploadDownloadPage.verifyFileUploaded('small-text.txt');
      await uploadDownloadPage.verifyFileSize(TEST_FILES.smallText.size);
      await uploadDownloadPage.verifyFileType(TEST_FILES.smallText.type);
      await uploadDownloadPage.verifyUploadSuccessMessage(EXPECTED_MESSAGES.uploadSuccess);
    });

    test('should test upload and download workflow', { tag: '@file-upload' }, async () => {
      const filePath = path.join(__dirname, '../test-files/small-text.txt');
      
      await uploadDownloadPage.uploadSingleFile(filePath);
      await uploadDownloadPage.verifyFileUploaded('small-text.txt');
      
      await uploadDownloadPage.testDownloadWorkflow('sampleFile.jpeg');
    });
  });

  test.describe('Data-Driven Testing', () => {
    for (const fileType of DATA_DRIVEN_FILE_TYPES) {
      test(`should upload ${fileType.name} successfully - ${fileType.description}`, { tag: '@file-upload' }, async () => {
        await uploadDownloadPage.testDataDrivenFileUpload(fileType);
      });
    }
  });
}); 