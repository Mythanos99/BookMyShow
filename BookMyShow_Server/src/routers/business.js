const express = require("express");
const router = new express.Router();

const business_controller = require("../controllers/business.js");

router.post("/", business_controller.addBusiness);
router.get("/access/:id",business_controller.getAccess);
router.get("",business_controller.getAllBusinesses);
router.put("/reapply/:id",business_controller.reapplyForAccess);
router.put("/update-access/:id",business_controller.updateAccess);

module.exports = router;