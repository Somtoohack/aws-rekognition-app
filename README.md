# aws-rekognition-api

## Face Recognition and Document Analysis API

This API provides a set of endpoints for face recognition and document analysis using Amazon Rekognition. The API is built using Node.js and Express.js, and uses Multer for file uploads.

## Endpoints

### `/upload`
- **Method**: POST
- **Description**: Upload an image and detect faces in it.
- **Request Body**: 
  - `image` (file)
- **Response**: JSON object with face detection results

### `/compare-faces`
- **Method**: POST
- **Description**: Compare two faces to determine if they are the same person.
- **Request Body**:
  - `sourceImage` (file)
  - `targetImage` (file)
- **Response**: JSON object with face comparison results

### `/extract-text`
- **Method**: POST
- **Description**: Extract text from an ID document.
- **Request Body**:
  - `document` (file)
- **Response**: JSON object with extracted text

## Middleware

### Authorization Middleware
- **`checkSourceKey`** is used to check for a valid `Source-Key` in the request headers.

## Controllers

### Rekognition Controller
- Handles face detection, face comparison, and text extraction using Amazon Rekognition.

## File Uploads

### Upload Directory
- `uploads/`

### Multer Configuration
- `dest: 'uploads/'`

## Getting Started

1. Clone the repository and install dependencies with `npm install`.
2. Set up your Amazon Rekognition credentials.
3. Start the server with `node app.js`.
4. Use a tool like Postman to test the API endpoints.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
# aws-rekognition-app
