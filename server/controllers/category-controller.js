const Category = require("../models/category-model");
const slugify = require("slugify");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Name of Category is required !" });
    }
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ msg: "Category already exists !" });
    }
    const category = new Category({
      name,
      slug: slugify(name),
    });
    const savedCategory = await category.save();
    res
      .status(201)
      .json({ msg: "Category Created !", category: savedCategory });
  } catch (err) {
    res.status(400).json({ msg: "Error in addCategory !", err });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json({ msg: "All Categories fetched !", category });
  } catch (err) {
    res.status(400).json({ msg: "Error in getAllCategory !", err });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(400).json({ msg: "No Category !" });
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { slug },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Category Updated !", category: updatedCategory });
  } catch (err) {
    res.status(400).json({ msg: "Error in updateCategory !", err });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).json({ msg: "No Category !" });
    }
    await Category.findByIdAndDelete(id);
    res.status(200).json({ msg: "Category deleted !" });
  } catch (err) {
    res.status(400).json({ msg: "Error in deleteCategory !", err });
  }
};
