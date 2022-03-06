import multer from 'multer'
// this middleware will automatically parse the multipart/form-data requests and will allow us to reach req.body and req.file , also it can validate the files comming with the request
const formDataMiddleWare = multer({
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
export default formDataMiddleWare