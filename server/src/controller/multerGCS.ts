import multer from 'multer'
import MulterGoogleCloudStorage from 'multer-google-storage';
import { extname } from 'path'

export type GCSMulterFile = {
    file: {
        location: string
    }
}

export const upload = multer({
    storage: new MulterGoogleCloudStorage({
        filename(req, file, cb) {
            cb(null,`${Date.now()}_${file.originalname}`);
        }
    })
})