export const FILE_UPLOAD_SELECTORS = {
  fileInput: '#uploadFile',
  downloadLink: '#downloadButton',
  uploadMessage: '#uploadedFilePath',
  dropZone: '#uploadFile',
  fileList: '.file-list',
  uploadButton: '#uploadBtn',
  clearButton: '#clearBtn'
} as const;

export const FILE_TYPES = {
  image: {
    jpg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp'
  },
  document: {
    pdf: 'application/pdf',
    txt: 'text/plain',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  },
  archive: {
    zip: 'application/zip',
    rar: 'application/x-rar',
    tar: 'application/x-tar'
  }
} as const;

export const TEST_FILES = {
  smallText: {
    name: 'small-text.txt',
    size: 177,
    type: FILE_TYPES.document.txt,
    content: 'This is a small test file for upload testing.',
    extension: '.txt'
  },
  largeText: {
    name: 'large-text.txt',
    size: 202,
    type: FILE_TYPES.document.txt,
    content: 'This is a larger test file for upload performance testing.',
    extension: '.txt'
  },
  testDocument: {
    name: 'test-document.txt',
    size: 202,
    type: FILE_TYPES.document.txt,
    content: 'This is a test document for multiple file upload testing.',
    extension: '.txt'
  },
  pdfDocument: {
    name: 'test-document.pdf',
    size: 463,
    type: FILE_TYPES.document.pdf,
    content: 'PDF test content',
    extension: '.pdf'
  },
  wordDocument: {
    name: 'test-document.doc',
    size: 144,
    type: FILE_TYPES.document.doc,
    content: 'Word document test content',
    extension: '.doc'
  },
  wordDocumentX: {
    name: 'test-document.docx',
    size: 155,
    type: FILE_TYPES.document.docx,
    content: 'Word document X test content',
    extension: '.docx'
  },
  jpgImage: {
    name: 'test-image.jpg',
    size: 123,
    type: FILE_TYPES.image.jpg,
    content: 'JPG image test content',
    extension: '.jpg'
  },
  pngImage: {
    name: 'test-image.png',
    size: 120,
    type: FILE_TYPES.image.png,
    content: 'PNG image test content',
    extension: '.png'
  },
  gifImage: {
    name: 'test-image.gif',
    size: 123,
    type: FILE_TYPES.image.gif,
    content: 'GIF image test content',
    extension: '.gif'
  },
  zipArchive: {
    name: 'test-archive.zip',
    size: 123,
    type: FILE_TYPES.archive.zip,
    content: 'ZIP archive test content',
    extension: '.zip'
  },
  rarArchive: {
    name: 'test-archive.rar',
    size: 125,
    type: FILE_TYPES.archive.rar,
    content: 'RAR archive test content',
    extension: '.rar'
  }
} as const;

export const DATA_DRIVEN_FILE_TYPES = [
  {
    name: 'Text File',
    file: TEST_FILES.smallText,
    description: 'Plain text file upload'
  },
  {
    name: 'PDF Document',
    file: TEST_FILES.pdfDocument,
    description: 'PDF document upload'
  },
  {
    name: 'Word Document',
    file: TEST_FILES.wordDocument,
    description: 'Word document upload'
  },
  {
    name: 'Word Document X',
    file: TEST_FILES.wordDocumentX,
    description: 'Word document X upload'
  },
  {
    name: 'JPG Image',
    file: TEST_FILES.jpgImage,
    description: 'JPG image upload'
  },
  {
    name: 'PNG Image',
    file: TEST_FILES.pngImage,
    description: 'PNG image upload'
  },
  {
    name: 'GIF Image',
    file: TEST_FILES.gifImage,
    description: 'GIF image upload'
  },
  {
    name: 'ZIP Archive',
    file: TEST_FILES.zipArchive,
    description: 'ZIP archive upload'
  },
  {
    name: 'RAR Archive',
    file: TEST_FILES.rarArchive,
    description: 'RAR archive upload'
  }
] as const;

export const PERFORMANCE_THRESHOLDS = {
  smallFileUpload: 2000,
  largeFileUpload: 10000,
  multipleFileUpload: 5000,
  downloadOperation: 3000,
  fileValidation: 1000
} as const;

export const EXPECTED_MESSAGES = {
  uploadSuccess: 'C:\\fakepath\\small-text.txt',
  uploadError: 'File upload failed',
  fileTooLarge: 'File size exceeds limit',
  invalidFileType: 'Invalid file type',
  downloadSuccess: 'File downloaded successfully'
} as const;

export const FILE_SIZE_LIMITS = {
  maxUploadSize: 10 * 1024 * 1024,
  minUploadSize: 1,
  recommendedSize: 1024 * 1024
} as const;

export const ALLOWED_FILE_EXTENSIONS = [
  '.txt', '.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.zip', '.rar'
] as const;

export const TEST_SCENARIOS = {
  singleFileUpload: 'Upload a single file and verify success',
  multipleFileUpload: 'Upload multiple files simultaneously',
  largeFileUpload: 'Upload a large file and measure performance',
  invalidFileType: 'Attempt to upload an invalid file type',
  fileSizeValidation: 'Test file size validation limits',
  downloadFunctionality: 'Test file download functionality',
  dragAndDropUpload: 'Test drag and drop file upload',
  clearFileInput: 'Test clearing file input functionality',
  uploadPerformance: 'Measure upload performance metrics',
  fileTypeValidation: 'Validate different file types',
  dataDrivenUpload: 'Data-driven test for multiple file types'
} as const;

export const ERROR_MESSAGES = {
  fileNotFound: 'File not found',
  uploadTimeout: 'Upload operation timed out',
  networkError: 'Network error during upload',
  serverError: 'Server error occurred',
  invalidFile: 'Invalid file format'
} as const; 