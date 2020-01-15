const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const keys = require('../../config/keys');

//Load input validation
const validateLoginInput = require('../../validation/login');

//Load user model
const UserDelivery = require('../../models/UserDelivery');

/*Avatar*/
var fs = require('fs');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads'); // destination folder
  },
  filename: function(req, file, cb) {
    let fileObj = {
      'image/png': '.png',
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
    };
    let img = req.body.id + req.body.name;
    cb(null, img);
  },
});

var upload = multer({storage: storage});

//other imports and code will go here
router.post('/upload', upload.single('fileData'), async (req, res) => {
  try {
    let fileObj = {
      'image/png': '.png',
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
    };
    let img = req.body.id + req.body.name;
    let avatar = await UserDelivery.findOneAndUpdate(
      {_id: req.body.id},
      {$set: {avatar: img}},
    );
    res.json(avatar);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Err');
  }
});

// @route  POST api/users/login
// @desc   Login User / Returning jwt
// @access Public
router.post('/login', async (req, res) => {
  try {
    const {errors, isValid} = validateLoginInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const {email, password} = req.body;

    //find user by email
    let user = await UserDelivery.findOne({email});
    if (!user) {
      errors.email = 'Usuario no encontrado';
      return res.status(400).json(errors);
    }

    //check password
    let checkPass = await bcrypt.compare(password, user.password);
    if (checkPass) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      //sign Token
      let token = await jwt.sign(payload, keys.secretOrKey);
      res.json({
        success: true,
        token: 'Bearer ' + token,
      });
    } else {
      errors.password = 'Password incorrecto';
      return res.status(400).json(errors);
    }
  } catch (err) {
    return console.log(err);
  }
});

// @route   Post api/users/forgot
// @desc    forgot pass user
// @access  Public
router.post('/forgot', async (req, res) => {
  try {
    const email = req.body.email;
    let errors = {};
    //Find user by email
    let user = await UserDelivery.findOne({email});
    if (!user) {
      errors.email = 'Usario no encontrado';
      return res.status(404).json(errors);
    }
    var randomstring = Math.random()
      .toString(36)
      .slice(-8);

    // Gen hash password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(randomstring, salt);

    let changePass = await UserDelivery.findOneAndUpdate(
      {email: email},
      {$set: {password: hash}},
    );

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.email',
        port: 465,
        secure: true,
        auth: {
          user: 'wwunit19@gmail.com', // generated ethereal user
          pass: 'Camelsinfiltro', // generated ethereal password
        },
      }),
    );

    let info = await transporter.sendMail({
      from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
      to: email, // list of receivers
      subject: 'New pass ✔', // Subject line
      text: 'New password', // plain text body
      html: '<b>' + randomstring + '</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    res.json(changePass);
  } catch (err) {
    console.error(err);
    res.status(500).send('Err in the server ' + err);
  }
});

// @route   GET api/users/profile/:id
// @desc    Profile
// @access  Private
router.get(
  '/profile/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let perfil = await UserDelivery.findById(req.params.id, [
        'name',
        'email',
        'aPaterno',
        'aMaterno',
        'cel',
        'avatar',
      ]);
      res.json(perfil);
    } catch (err) {
      console.error(err);
      res.status(500).send('Err in the server');
    }
  },
);

// @route   PUT api/users/profile/:id
// @desc    Profile
// @access  Private
router.patch(
  '/profile/:id',
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
    try {
      let checkEmail = await UserDelivery.findOne({email: req.body.email});
      if (checkEmail) {
        if (checkEmail._id != req.params.id) {
          return res.status(400).json({email: 'Email already exists'});
        }
      }
      let fields = {
        name: req.body.name,
        email: req.body.email,
        aPaterno: req.body.aPaterno,
        aMaterno: req.body.aMaterno,
        cel: req.body.cel,
      };
      let perfil = await UserDelivery.findOneAndUpdate(
        {_id: req.params.id},
        fields,
      );
      res.json(perfil);
    } catch (err) {
      console.error(err);
      res.status(500).send('Err in the server');
    }
  },
);

module.exports = router;
