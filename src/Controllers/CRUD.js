const { Usuarios, Bills } = require("../db");
const jwt = require("jsonwebtoken");

//CRUD BILLS
const getAllBillsByMes = async (req, res, next) => {
  try {
    let { usuarioId, mes } = req.query;
    console.log(req.user);
    let allData = [];
    const foundUsuario = await Usuarios.findOne({ where: { id: usuarioId } });
    const allBills = await Bills.findAll({
      where: { usuarioId: foundUsuario.id, mes: mes },
      include: { all: true, nested: true },
    });
    allData = allBills;
    if (allData.length === 0) {
      return res.status(404).json({
        message: "No se encontró ningun gasto para este usuario",
        error: true,
      });
    }
    console.log(allData.length);
    return res.json(allData);
  } catch (error) {
    next(error);
  }
};
const getAllBills = async (req, res, next) => {
  try {
    let { usuarioId } = req.query;
    let allData = [];
    const foundUsuario = await Usuarios.findOne({ where: { id: usuarioId } });
    const allBills = await Bills.findAll({
      where: { usuarioId: foundUsuario.id },
    });
    console.log(allBills);
    allData = allBills;
    if (allData.length === 0) {
      return res.status(404).json({
        message: "No se encontró ningun gasto para este usuario",
        error: true,
      });
    }
    console.log(allData.length);
    return res.json(allData);
  } catch (error) {
    next(error);
  }
};
const postaBill = async (req, res, next) => {
  try {
    let { id, nombre, dia, monto, tipo, mes } = req.body;
    console.log(id, nombre, dia, monto, tipo, mes);
    const newBill = await Bills.create({
      nombre: nombre,
      dia: parseInt(dia),
      monto: parseInt(monto),
      tipo: tipo,
      mes: mes,
      usuarioId: id,
    });
    return res.json({ message: "Gasto añadido", gasto: newBill });
  } catch (error) {
    next(error);
  }
};

const deleteBill = async (req, res, next) => {
  try {
    let { id } = req.body;
    const deletedBill = await Bills.destroy({ where: { id: parseInt(id) } });
    if (deletedBill > 0) {
      return res.status(200).json({ message: "Gasto eliminado" });
    } else {
      return res
        .status(404)
        .json({ message: "Objeto no encontrado o ya eliminado" });
    }
  } catch (error) {
    next(error);
  }
};
//CRUD USUARIOS
const postUsuario = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    console.log(name, email, password);
    const foundName = await Usuarios.findOne({ where: { name: name } });
    const foundEmail = await Usuarios.findOne({ where: { email: email } });
    if (!foundName || !foundEmail) {
      const newUsuario = await Usuarios.create({
        name: name,
        email: email,
        password: password,
      });
      return res.json({ message: "Usuario Creado", usuario: newUsuario });
    }
    return res
      .status(400)
      .json({ message: "Nombre o email ya registrado", error: true });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    let { name, password } = req.body;
    console.log(name, password);
    const foundUser = await Usuarios.findOne({
      where: { name: name, password: password },
    });
    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "credenciales invalidas", error: true });
    }
    const token = jwt.sign(foundUser.dataValues, process.env.JWT_TOKEN_SECRET);
    res.json({ token, user: foundUser.dataValues });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllBillsByMes,
  getAllBills,
  postaBill,
  postUsuario,
  login,
  deleteBill,
};
