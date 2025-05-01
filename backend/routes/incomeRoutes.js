const {
  addIncome,
  getAllIncome,
  downloadIncomeExcel,
  deleteIncome,
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getAllIncome);
router.get("/downloadExcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

module.exports = router;
