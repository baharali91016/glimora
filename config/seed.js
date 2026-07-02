const Product = require("../models/Products");

async function seedProducts() {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return;
    }

    await Product.create({
      name: "Ocean Shell Bracelet",
      description: "Handcrafted beach accessory with natural shells and sunlit shine.",
      price: 29.99,
      stock: 12,
      images: [
        "images/product1.jpg",
        "images/product2.jpg",
        "images/product3.jpg",
        "images/product4.jpg"
      ]
    });

    console.log("Default product seeded into MongoDB.");
  } catch (err) {
    console.error("Error seeding default products:", err);
    throw err;
  }
}

module.exports = seedProducts;
