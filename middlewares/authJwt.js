const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;
const jwt_decode = require("jwt-decode")

verifyToken = (req, res, next) => {
    let token = req.session.token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
    const decoded = jwt_decode(token);
    const id = decoded.data._id

    try {
        User.findById(id).exec((err, user) => {
            console.log(user)
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            Role.find(
                {
                    _id: { $in: user.roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === "admin") {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({ message: "Require Admin Role!" });
                }
            );
        });
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

isModerator = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
    const decoded = jwt_decode(token);
    const id = decoded.data._id

    try {
        User.findById(id).exec((err, user) => {
            console.log(user)
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            Role.find(
                {
                    _id: { $in: user.roles },
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === "moderator") {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({ message: "Require Moderator Role!" });
                }
            );
        });
    } catch (ex) {
        res.status(400).send({ message: 'Invalid token.' });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
};
module.exports = authJwt;