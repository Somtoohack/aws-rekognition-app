const express = require('express');
const multer = require('multer');
const rekognitionController = require('../controllers/rekognitionController');
const checkSourceKey = require('../middleware/authorizationMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Apply middleware to check for Source-Key
router.use(checkSourceKey);

// Route to upload image and analyze it
router.post('/upload', upload.single('image'), rekognitionController.detectFaces);

// Route to compare faces
router.post('/compare-faces', upload.fields([{ name: 'sourceImage' }, { name: 'targetImage' }]), rekognitionController.compareFaces);

// Route to extract text from ID document
router.post('/extract-text', upload.single('document'), rekognitionController.extractTextFromDocument);

module.exports = router;
