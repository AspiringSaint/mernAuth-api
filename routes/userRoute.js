const router = require('express').Router();

const { createNewUser, getAllUsers} = require('../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser);

module.exports = router;