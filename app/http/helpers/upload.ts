const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, './uploads')
    },
    filename: function (req:any, file:any, cb:any) {
        // generate the public name, removing problematic characters
        const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '')
        const timestamp = Date.now()
        const extension = path.extname(file.originalname).toLowerCase()
        cb(null, originalName + '_' + timestamp + extension)
    }
})

export const uploadMulter = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 Mb
    fileFilter: (req:any, file:any, callback:any) => {
        const acceptableExtensions = ['png', 'jpg', 'jpeg', 'jpg']
        if (!(acceptableExtensions.some(extension =>
                path.extname(file.originalname).toLowerCase() === `.${extension}`)
        )) {
            return callback(new Error(`Extension not allowed, accepted extensions are ${acceptableExtensions.join(',')}`))
        }
        callback(null, true)
    }
})