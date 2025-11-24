const express = require("express");
const router = express.Router();
const MemberController = require("./Member_controller");

// Create member
router.post("/createmember", MemberController.createMember);

// Get all members
router.get("/getallmembers", MemberController.getAllMembers);

// Get member by memberId (using params)
router.get("/getmembersbyid/:memberId", MemberController.getMemberById);

// Update member by memberId
router.put("/updatemembersbyid/:memberId", MemberController.updateMember);

// Delete member by memberId
router.delete("/deletememberbyid/:memberId", MemberController.deleteMember);

module.exports = router;
