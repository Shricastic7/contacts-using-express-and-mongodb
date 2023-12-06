const express = require('express');
const router = express.Router();
const {registerUser, loginUser, currentUser} = require('../controllers/usersControllers');
const ValidateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/current', ValidateToken, currentUser);


module.exports = router;