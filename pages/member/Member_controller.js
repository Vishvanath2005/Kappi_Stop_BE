const MemberService = require("./Member_Service");

exports.createMember = async (req, res) => {
  try {
    const created_by = req.query.role;

    if (!created_by) {
      return res.status(400).json({ message: "role query is required" });
    }

    const result = await MemberService.createMember(req.body, created_by);

    res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await MemberService.getAllMembers();
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await MemberService.getMemberById(req.params.memberId);
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await MemberService.updateMember(req.params.memberId, req.body);
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    await MemberService.deleteMember(req.params.memberId);
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
