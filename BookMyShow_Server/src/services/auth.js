const User = require("../models/user");
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");


async function verify_login(req, res) {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ username: email }); // Assuming username field stores email
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // // Compare password
    // const isMatch = await utils.comparePassword(password, user.password);

    // if (!isMatch) {
    //   return res.status(401).json({ message: "Invalid  password" });
    // }

    // Successful login - send a success response
    // After successful authentication
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwtToken", token, {
      httpOnly: true,
      sameSite: "Strict",
      expires: new Date(Date.now() + 3600000), // Cookie expiration
    });
    res
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user.id, username: user.username },
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { verify_login };
