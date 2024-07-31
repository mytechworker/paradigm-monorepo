import { Request, Response, NextFunction } from 'express';
import multer, { Options, Field } from 'multer';
import path from 'path';

const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (!file.mimetype.includes('image')) {
        return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
    } else cb(null, true);
};

function uuid() {
    const head = Date.now().toString(32);
    const tail = Math.random().toString(32).substring(2);

    return head + tail;
}

const multerOptions: Options = {
    storage: multer.diskStorage({
        filename: function (req: Request, file: Express.Multer.File, cb) {
            if (file.fieldname === 'image') {
                const imageName = `image-${uuid()}.jpeg`;
                req.body.image = imageName;
                cb(null, imageName);
            }
            if (file.fieldname === 'bannerImage') {
                const imageName = `banner-${uuid()}.jpeg`;
                req.body.bannerImage = imageName;
                cb(null, imageName);
            }
        },
        destination(req, file, callback) {
            if (file.fieldname === 'image') {
                req.body.image = file.filename;
                callback(
                    null,
                    path.join(__dirname, `../uploads/${req.query.dir}`)
                );
            } else if (file.fieldname === 'bannerImage') {
                req.body.bannerImage = file.filename;
                callback(
                    null,
                    path.join(__dirname, `../uploads/${req.query.dir}`)
                );
            }
        },
    }),
    fileFilter,
    // limits: { fields: 2, fileSize: 1024 * 1024 * 5 },
};

const upload = multer(multerOptions);

export const uploadSingleImage = (fieldName: string) =>
    upload.single(fieldName);

export const uploadMultipleImages = (fieldName: Field[]) =>
    upload.fields(fieldName);
