const TempUser = require("../model/TempUser");
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
};
module.exports = userService;
