const router = require('express').Router();
const rootController = require('../controllers/rootController');

router.get("/",rootController.showLogin)
router.get("/register",rootController.showRegister)
router.post("/register",rootController.addUser)
router.post("/login",rootController.loginUser)

router.post("/getAllCases",rootController.getAllCases)
router.post("/getCase",rootController.getCase)
router.post("/addCase",rootController.addCase)

module.exports = router