const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

exports.item_list = (req, res, next) => {
  Item.find({})
    .sort({ name: 1})
    .exec(function (err, list_items) {
      if (err) {
        return next(err);
      };
      res.send([list_items]);
    });
};

exports.item_detail = (req, res, next) => {
  Item.findById(req.params.id)
    .exec((err, item) => {
      if (err) {
        return next(err);
      }
      if (item == null) {
        // No results.
        const err = new Error("Item cannot be found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.send(item);
    })
};

exports.item_create_post = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const item = new Item({
    name: req.body.newItem.name,
    img: url + '/public/question.png',
    quality: req.body.newItem.quality,
    date_of_creation: req.body.newItem.date,
    description: req.body.newItem.description,
    stats: req.body.newItem.stats,
    special: req.body.newItem.special
  });
  item.save();
  res.redirect('/');
}

exports.item_delete_post = (req, res, next) => {
  Item.findByIdAndDelete(req.body.itemID, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
}

exports.item_update_post = (req, res, next) => {
  console.log(req.file);
  const url = req.protocol + '://' + req.get('host');
  const item = new Item({
    name: req.body.name,
    quality: req.body.quality,
    img: getImage(req.file, req.body.image, url),
    description: req.body.description,
    stats: getStats(req.body.stats_keys, req.body.stats_values),
    special: req.body.special,
    _id: req.body.id,
  });
  
  
  Item.findByIdAndUpdate(req.body.id, item, {}, (err, theitem) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
}

function getStats(keys, values) {
  let stats = [];
  for (let i = 0; i < keys.length; i++){
    let obj = {};
    obj[keys.split(',')[i]] = values.split(',')[i];
    stats.push(obj);
  }
  return stats;
}

function getImage(uploadedImage, oldImage, url) {
  if(uploadedImage === undefined) {
    return oldImage
  } 
  return url + '/public/' + uploadedImage.filename;
}