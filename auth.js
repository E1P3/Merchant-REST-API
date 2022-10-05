var express = require('express');
var router = express.Router();
var auth = require('./api/auth');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

var users = [
    {name: "jan" , password: "none", id: 1}
];

module.exports = router;

router.get('/', function(req, res){

    let user = users.find(u => u.email === req.body.email);
    if (!user) throw new Error("Invalid email or password.");

    const valid = bcrypt.compare(req.body.password, user.password)
    if (!valid) throw new Error("Invalid email or password.");

    const token = jwt.sign({
        id: user._id,
    }, "jwtPrivateKey");

    res.json({token: token});
});

router.post('/', [auth], (req, res) => {
    if(!req.body.name || !req.body.password){
    
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        var newId = users[users.length-1].id+1;
        users.push({
            name: req.body.name,
            password: req.body.password,
            id: newId
        });
        res.json({message: "New user " + req.body.name + " created"});
    }
});

