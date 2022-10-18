const router = require("express").Router();
const Category = require("../models/Category");
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
//
// ///UPDATE CATEGORY
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category.username === req.body.username) {
      try {
        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCategory);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your category!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//
// ////DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category.username === req.body.username) {
      try {
        await category.delete();

        res.status(200).json("Category has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your category!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//
// /// GET CATEGORY
router.get("/:name", async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.name });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});
//
// /// GET ALL CATEGORIES
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
