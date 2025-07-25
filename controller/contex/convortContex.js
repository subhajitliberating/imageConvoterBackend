const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const ConvortImage = async (req, res) => {
  try {
    const file = req.file;
    const format = req.body.format?.toLowerCase();

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!format || !['png', 'jpeg', 'webp', 'tiff', 'avif','gif'].includes(format)) {
      return res.status(400).json({ error: 'Invalid or missing format type' });
    }

    const originalName = path.parse(file.originalname).name;
    const outputFilename = `${originalName}-${Date.now()}.${format}`;
    const outputPath = path.join(__dirname, '..', 'uploads', outputFilename);

    await sharp(file.path)
      .toFormat(format)
      .toFile(outputPath);

    
    try {
      await fs.promises.unlink(file.path);
    } catch (unlinkErr) {
      console.warn(`Failed to delete temp upload: ${unlinkErr.message}`);
    }


    res.download(outputPath, outputFilename, async (err) => {
      if (err) {
        console.error('Download error:', err);
        res.status(500).send('Download failed');
      }

   
      try {
        await fs.promises.unlink(outputPath);
      } catch (cleanupErr) {
        console.warn(`Failed to delete converted image: ${cleanupErr.message}`);
      }
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({ error: 'Image conversion failed' });
  }
};

module.exports = { ConvortImage };
