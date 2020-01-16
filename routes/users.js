const router = require('express').Router();
const { getAllUsers, createUser, getUser} = require('../controllers/users');

router.get('/users', getAllUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUser);

module.exports = router;