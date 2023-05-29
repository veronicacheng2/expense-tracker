const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  const income = Income({ title, amount, category, description, date });

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
    res.status(200).json({ message: "Income Added" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ message: "All fields are required!" });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
  }
};

exports.getAllIncome = async (req, res) => {
  try {
    const allIncome = await Income.find().sort({ createdAt: -1 });
    res.status(200).json(allIncome);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    await Income.findByIdAndDelete(id);
    res.status(200).json({ message: "Income Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getTotalIncomes = async (req, res) => {
  try {
    const total = await Income.aggregate([
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
