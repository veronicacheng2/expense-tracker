const Expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const expense = Expense({ title, amount, category, description, date });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await income.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ message: "All fields are required!" });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
  }
};

exports.getAllExpense = async (req, res) => {
  try {
    const allExpense = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(allExpense);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTotalExpenses = async (req, res) => {
  try {
    const total = await Expense.aggregate([
      {
        $group: {
          _id: "total",
          totalAmount: {
            $sum: "$amount",
          },
        },
      },
    ]);
    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({ message: "Server Error", reason: err });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
