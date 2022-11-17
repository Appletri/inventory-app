const Item = require("../models/item");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
}

exports.item_list = (req, res) => {
  res.send("NOT IMPLEMENTED: item list");
}

exports.item_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
}

exports.item_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: item create GET");
}

exports.item_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: item create POST");
}

exports.item_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: item delete GET");
}

exports.item_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: item delete POST");
}

exports.item_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: item update GET");
}

exports.item_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: item update POST");
}