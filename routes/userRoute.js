const router = require('express').Router();

const { createNewUser, getAllUsers, deleteUser } = require('../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)
    .delete(deleteUser); 

module.exports = router;