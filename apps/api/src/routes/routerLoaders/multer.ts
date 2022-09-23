import multer from 'multer';
import path from 'path';

export default multer({ dest: path.join(__dirname, 'uploads') });
