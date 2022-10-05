var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    var token = req.header("x-auth-token");
    if (!token) return res.status(401).send({
        error: "Access denied. No token provided"
    });

    try {
        var decoded = jwt.verify(token, "jwtPrivateKey");
        req.user = decoded;
    } catch (error) {
        return res.status(401).send({
            error: "Token expired"
        });
    }

    next();
}