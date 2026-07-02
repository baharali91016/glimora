const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/auth");

const {
    getAllProductsPage,
    createProduct,
    getEditProductPage,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// List products page
router.get("/", getAllProductsPage);

// Create product
router.post("/", isAdmin, createProduct);

// Edit product page
router.get("/:id/edit", isAdmin, getEditProductPage);

// Update product
router.put("/:id", isAdmin, updateProduct);

// Delete product
router.delete("/:id", isAdmin, deleteProduct);

module.exports = router;