const MembershipPlan = require("./Membership_Schema");

exports.createPlan = async (data) => {
  return await MembershipPlan.create(data);
};

exports.getAllPlans = async () => {
  return await MembershipPlan.find().sort({ createdAt: -1 });
};

exports.getPlanById = async (id) => {
  const plan = await MembershipPlan.findById(id);
  if (!plan) {
    throw new Error("Membership plan not found");
  }
  return plan;
};

exports.updatePlan = async (id, data) => {
  const plan = await MembershipPlan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!plan) {
    throw new Error("Membership plan not found");
  }

  return plan;
};

exports.deletePlan = async (id) => {
  const plan = await MembershipPlan.findByIdAndDelete(id);
  if (!plan) {
    throw new Error("Membership plan not found");
  }
};
