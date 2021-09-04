const { Router } = require('express');
const { addPatient } = require('../controllers/patient');

const router = Router();

router.post('/', addPatient);

module.exports = router;
