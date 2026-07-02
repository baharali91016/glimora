const app = require("../app");
const connectDB = require("../config/db");

module.exports = async (req, res) => {
    try {
        await connectDB();
        return app(req, res);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);

    }

};