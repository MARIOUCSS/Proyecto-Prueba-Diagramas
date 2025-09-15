const OTP = require("../Models/Otp");
const sendOtp = require("../Utils/sendOtp");
const User = require("../Models/User");
const JWT = require("jsonwebtoken");
const LoginUser = async (req, res) => {
  const { email } = req.body;
  //const { name, email, jobTitle, company, password } = req.body;

  // console.log("hola");
  if (!email) {
    return res
      .status(400)
      .send({ success: false, error: "email or password invalidate" });
  }
  const subject = "Ecommerce App";
  const otp = Math.floor(Math.random() * 1000000);
  const prevOtp = await OTP.findOne({ email });
  if (prevOtp) {
    await prevOtp.deleteOne();
  }
  await sendOtp({ email, subject, otp });
  await OTP.create({ email, otp });
  res.json({
    message: "otp send to your mail",
  });
};
const VerifyUser = async (req, res) => {
  const { email, otp } = req.body;
  const haveOtp = await OTP.findOne({ email, otp });
  if (!haveOtp) {
    return res.status(400).send({ success: false, error: "Wrong otp" });
  }
  let user = await User.findOne({ email });
  if (user) {
    const token = await JWT.sign(
      {
        _id: user._id,
        //name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    await haveOtp.deleteOne();
    return res.status(200).send({
      success: true,
      message: "Connect",
      user,
      token,
    });
  } else {
    user = await User.create({ email });
    const token = await JWT.sign(
      {
        _id: user._id,
        //name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    await haveOtp.deleteOne();
    return res.status(200).send({
      success: true,
      message: "Connect",
      user,
      token,
    });
  }
};
const MyProfile = async (req, res) => {
  // {
  //   _id: user._id,
  //   //name: user.name,
  //   email: user.email,
  // },
  const user = await User.findById(req.user._id);
  //console.log("aca", __dirname);
  return res.status(200).send({ user });
};
module.exports = {
  LoginUser,
  VerifyUser,
  MyProfile,
};
