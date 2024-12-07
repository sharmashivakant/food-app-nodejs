const express = require('express');
const { testUserController } = require('../controllers/testController');

// routes object
 const router = express.Router();

// routers GET|POST|UPDATE|DELETE

router.get('/test-user',testUserController);

// export
module.exports = router;