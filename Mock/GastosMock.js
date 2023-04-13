const { Bills } = require("../src/db");
const BillsMockUp = async () => {
  try {
    await Bills.create({
      nombre: "Aquarius",
      dia: 2,
      monto: 120,
      tipo: "Casa",
      usuarioId: 1,
      mes: "Marzo",
    });
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = BillsMockUp;
