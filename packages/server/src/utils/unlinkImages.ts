import path from 'path';
import fs from 'fs';

const unlinkImages = async (images: string | string[], dirName: string) => {
    if (images instanceof Array) {
        images.map((image) => {
            fs.unlink(
                path.join(__dirname, `/../uploads/${dirName}/${image}`),
                (err) => {
                    if (err) {
                        console.log(
                            `>>> unlink error`,
                            process.env.NODE_ENV === 'production'
                                ? err.message
                                : err.stack
                        );

                        throw err;
                    }
                }
            );
            console.log(' >>> image removed >>>', image);
        });
    } else {
        fs.unlink(
            path.join(__dirname, `/../uploads/${dirName}/${images}`),
            (err) => {
                if (err) {
                    console.log(
                        `>>> unlink error`,
                        process.env.NODE_ENV === 'production'
                            ? err.message
                            : err.stack
                    );
                    throw err;
                }
            }
        );
        console.log(' >>> image removed >>>', images);
    }
};

export default unlinkImages;
