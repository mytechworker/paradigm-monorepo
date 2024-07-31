import path from 'path';
import fs from 'fs';

const checkifFoldersExists = (folders: string[]): Promise<void> => {
    const baseDir = path.join(__dirname, '..', 'uploads');

    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(baseDir)) {
                fs.mkdirSync(baseDir);

                console.log('>>> Uploads folder created');
            }

            folders.forEach((folder) => {
                const folderPath = path.join(baseDir, folder);

                // console.log(`folder path ====>`, folderPath);

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);

                    console.log(`>>> ${folder} folder created`);
                }
            });

            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export default checkifFoldersExists;
