const router = require("express").Router();
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  getTotalExpenses,
} = require("../controllers/ExpenseController");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
  getTotalIncomes,
} = require("../controllers/IncomeController");

router.route("/incomes").post(addIncome).get(getAllIncome);
router.route("/total-incomes").get(getTotalIncomes);

router.route("/incomes/:id").delete(deleteIncome);

router.route("/expenses").post(addExpense).get(getAllExpense);

router.route("/total-expenses").get(getTotalExpenses);

router.route("/expenses/:id").delete(deleteExpense);

module.exports = router;
