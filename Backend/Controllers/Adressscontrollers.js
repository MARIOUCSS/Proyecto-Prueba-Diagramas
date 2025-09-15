const Address = require("../Models/Address");

const CreateAdress = async (req, res) => {
  try {
    const { address, phone } = req.body;
    if (!address || !phone) {
      return res
        .status(400)
        .send({ message: "Ingresar los valores correspondientes" });
    }
    const adress = await Address.create({
      address,
      phone,
      user: req.user._id,
    });
    res.status(200).send({ message: "Address  Created", adress });
  } catch (error) {
    console.error("Error in CreateAdress:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const GetAllAdress = async (req, res) => {
  try {
    const alladdress = await Address.find({ user: req.user._id });
    return res.status(200).send({
      alladdress,
    });
  } catch (error) {
    console.error("Error in alladdress:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const GetSingleAddress = async (req, res) => {
  try {
    const Singleaddress = await Address.findById(req.params.id);
    return res.status(200).send({
      Singleaddress,
    });
  } catch (error) {
    console.error("Error in GetSingleAddress:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const Deleteaddress = async (req, res) => {
  try {
    console.log(
      "Deleting address with ID:",
      req.params.id,
      "for user:",
      req.user._id
    );
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    console.log(address);
    await address.deleteOne();
    res.status(200).send({ message: "address Deleted" });
  } catch (error) {
    console.error("Error in Deleteaddress:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = {
  CreateAdress,
  GetAllAdress,
  GetSingleAddress,
  Deleteaddress,
};
