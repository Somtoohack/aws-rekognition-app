const express = require('express');
const rekognitionRoutes = require('./routes/rekognitionRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', rekognitionRoutes);

app.get('/', (req, res) => {
  res.send('AWS Rekognition Image Upload and Comparison API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
