const Product = require("../models/product-model");
const slugify = require("slugify");
const fs = require("fs");

exports.addProduct = async (req, res) => {
  const { name, description, price, category } = req.fields;
  try {
    if (!name || !description || !price || !category) {
      return res
        .status(400)
        .json({ msg: "Name , Description , Price and category required !" });
    }
    const product = new Product({
      name,
      slug: slugify(name),
      description,
      price,
      category,
    });
    if (req.files?.photo) {
      if (req.files.photo.size > 1000000) {
        return res.status(400).json({ msg: "Photo is too large !" });
      }
      product.photo.data = fs.readFileSync(req.files.photo.path);
      product.photo.contentType = req.files.photo.type;
    }
    const savedProduct = await product.save();
    res.status(201).json({ msg: "New Product added !", product: savedProduct });
  } catch (err) {
    res.status(400).json({ msg: "Error in addProduct !", err: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .limit(12)
      .populate("category");
    res.status(200).json({ msg: "All Products fetched !", products });
  } catch (err) {
    res.status(400).json({ msg: "Error in getAllProducts !", err });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).json({ msg: "All Products fetched !", product });
  } catch (err) {
    res.status(400).json({ msg: "Error in getSingleProduct !", err });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const productExists = await Product.findOne({ slug });
    if (!productExists) {
      return res.status(400).json({ msg: "No Product Found !" });
    }
    const product = await Product.findOneAndUpdate(
      { slug },
      {
        name: req.fields.name ? req.fields.name : productExists.name,
        slug: req.fields.name ? slugify(req.fields.name) : productExists.slug,
        description: req.fields.description
          ? req.fields.description
          : productExists.description,
        price: req.fields.price ? req.fields.price : productExists.price,
        category: req.fields.category
          ? req.fields.category
          : productExists.category,
        photo: {
          data: req.files.photo
            ? fs.readFileSync(req.files.photo.path)
            : productExists.photo.data,
          contentType: req.files.photo
            ? req.files.photo.type
            : productExists.photo.contentType,
        },
      },
      { new: true }
    )
      .select("-photo")
      .populate("category");
    res.status(200).json({ msg: "Product Updated !", product });
  } catch (err) {
    res.status(400).json({ msg: "Error in updateProduct !", err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "Product Deleted !" });
  } catch (err) {
    res.status(400).json({ msg: "Error in deleteProduct !", err });
  }
};

exports.getProductPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ msg: "No such Product !" });
    }
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (err) {
    res.status(400).json({ msg: "Error in getProductPhoto !", err });
  }
};
