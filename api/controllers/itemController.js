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
  const item = new Item({
    name: req.body.newItem.name,
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


exports.item_update_post = (req, res) => {
  // // Validate and sanitize fields.
  // body("name", "Name must not be empty.")
  //  .trim()
  //  .isLength({ min: 1 })
  //  .escape(),
  // body("description", "Description must not be empty.")
  //  .trim()
  //  .isLength({ min: 1 })
  //  .escape(),
  // body("special", "Special must not be empty.")
  //  .trim()
  //  .isLength({ min: 1 })
  //  .escape(),

  // // Process request after validation and sanitization.
  // (req, res, next) => {
  //   // Extract the validation errors from a request.
  //   const errors = validationResult(req);

  // }
  console.log(req.body.forgedItem);
  const item = new Item({
    name: req.body.forgedItem.name,
    quality: req.body.forgedItem.quality,
    description: req.body.forgedItem.description,
    stats: req.body.forgedItem.stats,
    special: req.body.forgedItem.special,
    _id: req.body.forgedItem._id,
  });


  Item.findByIdAndUpdate(req.body.forgedItem._id, item, {}, (err, theitem) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
  
}

