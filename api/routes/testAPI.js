var express = require('express');
var router = express.Router();
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// const upload = multer({ dest: './public/data/uploads/', 
//                         limits:{fieldSize: 25 * 1024 * 1024} });

const item_controller = require('../controllers/itemController');

router.get("/", item_controller.item_list);
router.post("/create", item_controller.item_create_post);
router.get("/:id", item_controller.item_detail);
router.post("/:id/delete", item_controller.item_delete_post);
router.post("/:id/update", upload.single('item-image'), item_controller.item_update_post);



module.exports = router;