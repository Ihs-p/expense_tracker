
const { addExpense, getAllExpense, downloadExpenseExcel, deleteExpense } = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

const router = require("express").Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getAllExpense);
router.get("/downloadExcel", protect, downloadExpenseExcel);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
