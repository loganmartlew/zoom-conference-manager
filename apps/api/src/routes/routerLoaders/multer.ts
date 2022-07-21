import multer from 'multer';

// TODO : change excel storing location & name ?
// TODO : file filter ?

export default multer({ dest: 'uploads/' });
