const { Router } = require("express");

const Bills = require("./Bills");
const Usuarios = require("./Usuario");
const router = Router();

router.use("/Bills", Bills);
router.use("/Usuarios", Usuarios);

module.exports = router;
