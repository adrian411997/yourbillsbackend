const {
  getAllBillsByMes,
  getAllBills,
  postaBill,
  deleteBill,
} = require("../Controllers/CRUD");
const { verificarToken } = require("../Middleware/LoginToken");

const router = require("express").Router();

router.get("/", verificarToken, getAllBillsByMes);
router.get("/all", getAllBills);
router.post("/add", postaBill);
router.delete("/delete", deleteBill);
module.exports = router;
