import multer from 'multer'
import multerS3 from 'multer-s3'
import { extname } from 'path'
import { s3 } from '../service/UserService'

export type S3MulterFile = {
    file: {
        location: string
    }
}

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + extname(file.originalname))
        },
        acl: 'public-read'
    })
})