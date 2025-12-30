const TransactionService = require("./Transaction_Service");

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await TransactionService.createTransaction(req.body);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTransactionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions =
      await TransactionService.getTransactionsByUser(userId);

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction =
      await TransactionService.getTransactionById(req.params.id);

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
