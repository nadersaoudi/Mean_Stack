const { User } = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Get All Users
exports.getUsers = async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {

    res.status(500).json({ success: false });
  }

  res.send(userList);
};

//Get One User
exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
   
    res
      .status(500)
      .json({ message: "The User with the given ID was Not Found. " });
  }

  res.status(200).send(user);
};

//Create User Or Register
exports.creatUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });

  user = await user.save();

  if (!user) {
  
    return res.status(404).send("The User cannot be Created");
  }

  res.send(user);
};


//Update User
exports.updateUser = async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.passwordHash;
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );
  if (!user) {

    return res.status(404).send("The user cannot be Updated");
  }

  res.send(user);
};


//Login User
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  const expire = process.env.expire;
  if (!user) {

    return res.status(400).send("The User not Found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: expire }
    );

    res.status(200).send({ user: user.email, token });
  } else {

    res.status(400).send("Password is wrong");
  }
};


//Delete User
exports.userDelete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {

        return res
          .status(200)
          .json({ success: true, message: "The User is Deleted" });
      } else {

        return res
          .status(404)
          .json({ success: false, message: "User not Found" });
      }
    })
    .catch((err) => {

      return res.status(400).json({ success: false, error: err });
    });
};

//Get User Count 
exports.countUser = async (req, res) => {
  const userCount = await User.countDocuments();

  if (!userCount) {

    res.status(500).json({ success: false });
  }

  res.send({
    userCount: userCount,
  });
};
