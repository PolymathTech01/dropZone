const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});
router.post('/upload', async (req, res, next) => {
  const { images } = req.body;

  try {
    let promises = [];
    images.forEach(async (image) => {
      promises.push(
        cloudinary.uploader.upload(image, {
          folder: 'DropZone-Tutorial',
        })
      );
    });
    const response = await Promise.all(promises);
    res.send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
