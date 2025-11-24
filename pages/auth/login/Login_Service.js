const Member = require("../../member/Member_Schema");

exports.simpleLogin = async ({ email, phone, password }) => {
  let filter = {};

  if (email) filter.email = email;
  if (phone) filter.phone = phone;

  // Find member using email or phone
  const member = await Member.findOne(filter);

  if (!member) {
    return { success: false, message: "User not found" };
  }

  // Compare plain password
  if (member.member_password !== password) {
    return { success: false, message: "Incorrect password" };
  }

  return { success: true, data: member };
};
