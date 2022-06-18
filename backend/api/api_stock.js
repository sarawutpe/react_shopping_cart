const express = require("express");
const router = express.Router();
const apiTypes = require("../apiTypes");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");

const productSchema = require("../models/product_model");

// Upload and validate image function
uploadImage = async (files) => {
  try {
    // Check file not empty
    // Check images size < 1MB (1MB = 1048576 bytes)
    // Check image type is JPG, JPEG, PNG
    if (files.image) {
      if (files.image.size <= 1048576 && files.image.type == "image/jpeg" || files.image.type == "image/png") {
        const newpath = path.resolve("./uploaded") + "/images/" + files.image.name;
        await fs.moveSync(files.image.path, newpath);
        return true;
      }
    }
  
  } catch (error) {
    return false
  }
 
};

// Create product
router.post("/product", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      // check image not empty
      if (files.image) {
        // try upload image
        await uploadImage(files);
        // save to db
        const createData = { name: fields.name, image: files.image.name, price: fields.price, stock: fields.stock }
        const result = await new productSchema(createData).save();
        res.json([{status: apiTypes.ResultOk}, {message: result }]);
      } else {
        // save to db
        const result = await new productSchema(fields).save();
        res.json([{status: apiTypes.ResultOk}, {message: result }]);
      }
    });
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error });
  }
});

// Read all products
router.get("/product", async (req, res) => {
  try {
    const result = await productSchema.find()
    res.json([{status: apiTypes.ResultOk}, {message: result}]);
    // res.json(result);
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error });
  }
})

// Read product by id
router.get("/product/:id", async (req, res) => {
  try {
    const filterId = req.params.id;
    const result = await productSchema.findById(filterId);
    res.json([{status: apiTypes.ResultOk}, {message: result}]);
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error });
  }
})

// Update product by id
router.put("/product", async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (error, fields, files) => {
      if (files.image) {
        // try upload image
        await uploadImage(files);
        // save to db
        const updateData = { name: fields.name, image: files.image.name, price: fields.price, stock: fields.stock }
        const result = await productSchema.findByIdAndUpdate(fields._id, updateData);
        res.json([{status: apiTypes.ResultOk}, {message: result }]);
       } else {
        // save to db
        const result = await productSchema.findByIdAndUpdate(fields._id, fields);
        res.json([{status: apiTypes.ResultNotOk}, {message: result }]);
       }

    });
  } catch (error) {
     res.json([{status: apiTypes.ResultNotOk }, {message: error}]);
  }

});


// Delete all produtcs
router.delete("/product/clear", async (req, res) => {
  try {
    res.send("hello")
    /*
    const deleteResult = await userSchema.deleteMany();
    res.json({ status: apiTypes.ResultOk, result: deleteResult})
    */
  } catch (error) {
    res.json({ status: apiTypes.ResultNotOk, message: error })
  }
})

// Delete product by id
router.delete("/product/:id", async (req,res) => {
  try {
    const filterId = req.params.id;
    const result = await productSchema.findByIdAndDelete(filterId);
    res.json([{status: apiTypes.ResultOk}, {message: result}]);
  } catch (error) {
    res.json([{status: apiTypes.ResultNotOk}, {message: result}]);
  }
});




module.exports = router;
