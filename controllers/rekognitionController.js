const fs = require('fs');
const { DetectFacesCommand, CompareFacesCommand, DetectTextCommand } = require('@aws-sdk/client-rekognition');
const rekognitionClient = require('../config/awsConfig');

// Handle face detection
const detectFaces = async (req, res) => {
  const imagePath = req.file.path;

  try {
    const data = fs.readFileSync(imagePath);

    const command = new DetectFacesCommand({
      Image: { Bytes: data },
      Attributes: ['ALL'],
    });

    const response = await rekognitionClient.send(command);

    // Cleanup the upload folder
    fs.unlinkSync(imagePath);

    return res.status(200).json({ faces: response.FaceDetails });
  } catch (error) {
    // Cleanup
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    console.error('Error processing image:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

// Handle face comparison
const compareFaces = async (req, res) => {
  const sourceImagePath = req.files.sourceImage[0].path;
  const targetImagePath = req.files.targetImage[0].path;

  try {
    const sourceImageData = fs.readFileSync(sourceImagePath);
    const targetImageData = fs.readFileSync(targetImagePath);

    const command = new CompareFacesCommand({
      SourceImage: { Bytes: sourceImageData },
      TargetImage: { Bytes: targetImageData },
      SimilarityThreshold: 80, // Adjust the threshold as needed
    });

    const response = await rekognitionClient.send(command);

    // Cleanup
    fs.unlinkSync(sourceImagePath);
    fs.unlinkSync(targetImagePath);

    return res.status(200).json({ faceMatches: response.FaceMatches });
  } catch (error) {
    // Cleanup
    if (fs.existsSync(sourceImagePath)) {
      fs.unlinkSync(sourceImagePath);
    }
    if (fs.existsSync(targetImagePath)) {
      fs.unlinkSync(targetImagePath);
    }
    console.error('Error comparing faces:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

const extractTextFromDocument = async (req, res) => {
    const imagePath = req.file.path;
    const { firstName, surname, middleName } = req.body; // Expecting these details in the request body
  
    try {
      const imageData = fs.readFileSync(imagePath);
  
      const command = new DetectTextCommand({
        Image: { Bytes: imageData },
      });
  
      const response = await rekognitionClient.send(command);
  
      // Extract text from the response
      const detectedText = response.TextDetections.map(detection => detection.DetectedText).join(' ');
  
      // Cleanup
      fs.unlinkSync(imagePath);
  
      // Define patterns for name validation
      const firstNamePattern = new RegExp(firstName, 'i'); // Case-insensitive search
      const surnamePattern = new RegExp(surname, 'i'); // Case-insensitive search
      const middleNamePattern = new RegExp(middleName, 'i'); // Case-insensitive search
  
      // Validate if names are present in the extracted text
      const isFirstNameValid = firstNamePattern.test(detectedText);
      const isSurnameValid = surnamePattern.test(detectedText);
      const isMiddleNameValid = middleNamePattern.test(detectedText);
  
      return res.status(200).json({
        detectedText,
        isFirstNameValid,
        isSurnameValid,
        isMiddleNameValid,
      });
    } catch (error) {
      // Cleanup
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      console.error('Error extracting text:', error);
      return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
  };

module.exports = {
  detectFaces,
  compareFaces,
  extractTextFromDocument,
};
