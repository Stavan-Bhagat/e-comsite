const TempUser = require("../model/TempUser");
const User = require("../model/user");
const CryptoJS = require("crypto-js");
const secretKey = process.env.CRYPTO_PASSWORD;
const userService = {
  register: async (userData) => {
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
  },
  login: async (userData) => {
    try {
      const user = await User.findOne({ email: userData.email });
      if (!user) {
        return { success: false, message: "Login failed" };
      }
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
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
  },
  getUserData: async () => {
    try {
      const userData = await User.find({});
      return userData;
    } catch (e) {
      throw e;
    }
  },
  updateData: async ({ id, name, email, role }) => {
    try {
      let updateFields = { name, email, role };

      const updateUser = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });
      return updateUser;
    } catch (error) {
      console.log("user service register error ", error);
      throw error;
    }
  },
};
module.exports = userService;
