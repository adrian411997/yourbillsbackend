const { postUsuario, login } = require("../Controllers/CRUD");

const router = require("express").Router();

router.post("/", postUsuario);
router.post("/login", login);

module.exports = router;
