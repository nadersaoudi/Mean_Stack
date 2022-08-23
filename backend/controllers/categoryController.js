const { Category } = require("../models/category");

//Get All Categorys
exports.getCategorys = async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {

    res.status(500).json({ success: false });
  }

  res.status(200).send(categoryList);
};

//Get One Category
exports.getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {

    res
      .status(500)
      .json({ message: "The Category with the given ID was Not Found. " });
  }

  res.status(200).send(category);
};

//Create Category
exports.createCategory = async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  category = await category.save();

  if (!category) {
    
    return res.status(404).send("The Category cannot be Created");
  }

  res.send(category);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );
  if (!category) {

    return res.status(404).send("The Category cannot be Updated");
  }

  res.send(category);
};

//Delete Category
exports.deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {

        return res
          .status(200)
          .json({ success: true, message: "The Category is Deleted" });
      } else {

        return res
          .status(404)
          .json({ success: false, message: "Category not Found" });
      }
    })
    .catch((err) => {

      return res.status(400).json({ success: false, error: err });
    });
};
