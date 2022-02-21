const multer = require('multer')
const upload_pet_image = multer({
  limits: {
    // file size is limited to 10MB
    fileSize: 10000000 
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/))
      return cb(new Error('Please Upload an image file jpg, png, jpeg'))
    // if the file type is valid
    cb(undefined, true)
  }
})
module.exports = upload_pet_image