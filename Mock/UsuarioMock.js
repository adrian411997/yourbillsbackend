const { Usuarios } = require("../src/db");
const UsariosMockUp = async () => {
  try {
    await Usuarios.create({
      name: "xd",
      email: "kikokampos@gmail.com",
      password: "xdddddd",
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = UsariosMockUp;
