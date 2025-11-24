const Member = require("./Member_Schema");

exports.createMember = async (data, role_from_params) => {
  const { member_name, phone, email, role, store } = data;

  // Prefix from role
  const prefix = role.substring(0, 3).toUpperCase();

  const lastMember = await Member.findOne({
    memberId: new RegExp(`^${prefix}`)
  }).sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastMember) {
    const lastIdNum = parseInt(lastMember.memberId.slice(3), 10);
    nextNumber = lastIdNum + 1;
  }

  const memberId = `${prefix}${String(nextNumber).padStart(3, "0")}`;

  const password =
    member_name.substring(0, 4).toUpperCase() + "@" + phone.slice(-4);

  const newMember = new Member({
    memberId,
    member_name,
    phone,
    email,
    member_password: password,
    role,
    store,
    status: "Active",
    created_by: role_from_params   // ✅ FIXED (lowercase)
  });

  return await newMember.save();
};


exports.getAllMembers = async () => {
  return await Member.find().sort({ createdAt: -1 });
};

exports.getMemberById = async (memberId) => {
  return await Member.findOne({ memberId });
};

exports.updateMember = async (memberId, updateBody) => {
  return await Member.findOneAndUpdate(
    { memberId },
    updateBody,
    { new: true }
  );
};

exports.deleteMember = async (memberId) => {
  return await Member.findOneAndDelete({ memberId });
};
