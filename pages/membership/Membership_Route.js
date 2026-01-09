const express = require("express");
const router = express.Router();
const membershipPlanController = require("./Membership_Controller");
const uploadMembership = require("../../middleware/Upload.js")("membership");

router.post(
  "/createmembership",
  uploadMembership.single("plan_img"),
  membershipPlanController.createPlan
);
router.get("/getallmembership", membershipPlanController.getAllPlans);
router.get("/getmembership/:id", membershipPlanController.getPlanById);
router.put(
  "/getmembership/:id",
  uploadMembership.single("plan_img"),
  membershipPlanController.updatePlan
);
router.delete("/deletemembership/:id", membershipPlanController.deletePlan);

module.exports = router;
