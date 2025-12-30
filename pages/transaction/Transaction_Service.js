const Transaction = require("./Transaction_Schema");
const User = require("../user/User_Schema");
const MembershipPlan = require("../membership/Membership_Schema");

exports.createTransaction = async (data) => {
  const {
    user_id,
    membership_plan_id,
    payment_type,
    payment_status,
    amount,
    payment_response,
  } = data;

  const plan = await MembershipPlan.findById(membership_plan_id);
  if (!plan) throw new Error("Membership plan not found");

  const transaction = await Transaction.create({
    transaction_id: `TXN-${Date.now()}`,
    user_id,
    membership_plan_id,
    payment_type,
    payment_status,
    amount,
    payment_response,
  });

  // ✅ If payment successful → upgrade membership
  if (payment_status === "SUCCESS") {
    await User.findOneAndUpdate(
      { userId: user_id },
      {
        membership_type: plan.plan_name,
        membership_plan_id: plan._id,
      },
      { new: true }
    );
  }

  return transaction;
};

exports.getTransactionsByUser = async (userId) => {
  return await Transaction.find({ user_id: userId })
    .populate("membership_plan_id")
    .sort({ createdAt: -1 });
};

exports.getTransactionById = async (id) => {
  const txn = await Transaction.findById(id).populate("membership_plan_id");
  if (!txn) throw new Error("Transaction not found");
  return txn;
};
