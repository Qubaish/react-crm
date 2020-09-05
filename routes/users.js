const Router = require('express').Router;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = Router();
const bcrypt = require('bcryptjs');
const sign =   require("jsonwebtoken").sign;
const { validateRegisterInput, validateLoginInput} = require('../validator');
const User = require("../models/User");
const { verifyAdmin } = require('../utils');


router.post("/register", passport.authenticate('jwt', {session: false}), verifyAdmin, function(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(200).json({...errors, err: true});
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(200).json({ err: true, email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json({err: false, user: user}))
                    .catch(err => res.json({err: true, user: null}));
                });
            });
        }
    });
});

router.put("/:id", passport.authenticate('jwt', {session: false}), verifyAdmin, function(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(200).json({...errors, err: true});
    }

    console.log(req.body);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            req.body.password = hash;
            User.findOneAndUpdate({_id: req.body._id}, req.body, function(err, doc) {
                if (err) return res.send(500, {error: err});
                    res.status(200).json({err: false, msg: 'success'});
            });
        });
    });
   
});


router.post("/login", function(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(200).json({...errors, err: true});
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(200).json({ msg: "Email not found", err: true });
        }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
            const payload = {
                id: user.id,
                name: user.name,
                admin: user.isAdmin
            };
            // Sign token
            sign(
                payload,
                process.env.SECRET_KEY,
                {
                    expiresIn: 1800
                },
                (err, token) => {
                res.json({
                    err: false,
                    token: "Bearer " + token
                });
            }
            );
        } else {
          return res
            .status(200)
            .json({ msg: "Password incorrect", err: true });
        }
      });
    });
});

router.get("/", passport.authenticate('jwt', {session: false}), verifyAdmin, function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res.status(500).json({err: true})
        }
        res.status(200).json({err: false, users: users});
     });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    User.deleteOne({ _id: id }, function (err) {
        if (err) {
            res.status(500).json({err: true})
        }
        res.status(200).json({err: false, msg: 'success'});
    });
});

module.exports = router;