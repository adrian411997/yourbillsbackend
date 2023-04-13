const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const UsuariosMock = require("./Mock/UsuarioMock");
const BillsMockUp = require("./Mock/GastosMock");

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3002, async () => {
    await UsuariosMock();
    await BillsMockUp();
    console.log("Servidor Iniciado");
  });
});
