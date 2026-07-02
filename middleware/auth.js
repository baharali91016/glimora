// User must be logged in
const isLoggedIn = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
};

// User must be admin
const isAdmin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    if (req.session.user.role !== "admin") {
        return res.send("Access Denied");
    }

    next();
};

module.exports = {
    isLoggedIn,
    isAdmin
};