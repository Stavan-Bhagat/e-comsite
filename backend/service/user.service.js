const TempUser = require("../model/TempUser.model");
const User = require("../model/user.model");
const CryptoJS = require("crypto-js");
const secretKey = process.env.CRYPTO_PASSWORD;

exports.register_service = async (userData) => {
  try {
    const createUser = await TempUser.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      imageUrl: userData.image,
      verificationToken: userData.token,
    });
    return createUser;
  } catch (error) {
    console.log("user service register error ", error);
    throw error;
  }
};

exports.login_service = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return { success: false, message: "Login failed" };
    }
    const decryptedPassword = CryptoJS.AES.decrypt(user.password, secretKey).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword === userData.password) {
      console.log("Login successful");
      return {
        success: true,
        message: "Login successful",
        user: user,
      };
    } else {
      console.log("Invalid credentials");
      return { success: false, message: "invalid credential" };
    }
  } catch (error) {
    console.log("userService login error:", error);
    throw error;
  }
};

exports.getUserData_service = async () => {
  try {
    const userData = await User.find({});
    return userData;
  } catch (e) {
    throw e;
  }
};

exports.updateData_service = async ({ id, name, email, role }) => {
  console.log("bla", id, name, email, role);
  if (role) {
    role = role.value;
    console.log("bla2");
  }
  try {
    let updateFields = { name, email, role };

    const updateUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    console.log;
    return updateUser;
  } catch (error) {
    console.log("user service register error ", error);
    throw error;
  }
};

exports.deleteData_service = async (id) => {
  try {
    const deleteUserData = await User.findByIdAndDelete(id);
    return deleteUserData;
  } catch (error) {
    console.log("getting blog Data error ", error);
    throw error;
  }
};
