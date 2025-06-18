const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const carController = require("../controllers/carController");


router.get('/user-count', userController.getUserCount);

router.get('/approved-car-count', carController.getApprovedCarCount);


module.exports = router;