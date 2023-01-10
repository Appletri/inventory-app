var express = require('express');
var router = express.Router();

const item_controller = require('../controllers/itemController');

router.get("/", item_controller.item_list);
router.post("/create", item_controller.item_create_post);
router.get("/:id", item_controller.item_detail);
router.post("/:id/delete", item_controller.item_delete_post);
router.post("/:id/update", item_controller.item_update_post);


module.exports = router;