const { ObjectId } = require("bson");
const Product = require("./model");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const view = (req, res) => {
  const { id } = req.params;
  Product.findOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.create({
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3000/public/${image.originalname}`,
    })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    Product.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          price,
          stock,
          status,
          image_url: `http://localhost:3000/public/${image.originalname}`,
        },
      }
    )
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const destroy = (req, res) => {
    const { id } = req.params;
    Product.deleteOne({ _id: new ObjectId(id) })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  };

module.exports = { index, store, view, update, destroy };
