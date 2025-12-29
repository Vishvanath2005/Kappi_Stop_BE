const membershipPlanService = require("./Membership_Service");
const fs = require("fs");
const path = require("path");

exports.createPlan = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.plan_benefits) {
      data.plan_benefits = JSON.parse(data.plan_benefits);
    }

    if (data.price) {
      data.price = Number(data.price.toString().replace(/,/g, ""));
    }

    if (req.file) {
      data.plan_img = `${req.file.filename}`;
    }

    const plan = await membershipPlanService.createPlan(data);

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await membershipPlanService.getAllPlans();
    res.status(200).json({
      success: true,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPlanById = async (req, res) => {
  try {
    const plan = await membershipPlanService.getPlanById(req.params.id);
    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.plan_benefits) {
      data.plan_benefits = JSON.parse(data.plan_benefits);
    }

    if (data.price) {
      data.price = Number(data.price.toString().replace(/,/g, ""));
    }

    const existingPlan = await membershipPlanService.getPlanById(req.params.id);

    if (req.file) {
      if (existingPlan.plan_img) {
        const oldImagePath = path.join(
          __dirname,
          "../../uploads/membership",
          existingPlan.plan_img
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      data.plan_img = req.file.filename;
    }

    const updatedPlan = await membershipPlanService.updatePlan(
      req.params.id,
      data
    );

    res.status(200).json({
      success: true,
      data: updatedPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    await membershipPlanService.deletePlan(req.params.id);
    res.status(200).json({
      success: true,
      message: "Membership plan deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
