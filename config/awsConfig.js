const { RekognitionClient } = require('@aws-sdk/client-rekognition');
const { fromEnv } = require('@aws-sdk/credential-provider-env');
const dotenv = require('dotenv');

dotenv.config();

const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(
    
  ),
});

module.exports = rekognitionClient;
