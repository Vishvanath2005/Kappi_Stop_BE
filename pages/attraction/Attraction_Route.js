const express = require("express");
const router = express.Router();
const AttractionController = require("./Attraction_Controller.js");

router.post("/createattraction", AttractionController.createAttraction);
router.get("/getallattractions", AttractionController.getAllAttractions);
router.get("/getattraction/:attractionID", AttractionController.getAttractionById);
router.put("/updateattraction/:attractionID", AttractionController.updateAttractionById);
router.delete("/deleteattraction/:attractionID", AttractionController.deleteAttractionById);

module.exports = router;
