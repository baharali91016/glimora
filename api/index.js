const app = require("../app");
const connectDB = require("../config/db");
const ensureDefaultProduct = require("../config/seed");

module.exports = async (req, res) => {
    try {
        await connectDB();
        await ensureDefaultProduct();
        return app(req, res);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);

    }

};