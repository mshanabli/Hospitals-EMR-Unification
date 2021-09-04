const { Router } = require('express');
const { addTreatment } = require('../controllers/treatment');

const router = Router();

router.post('/', addTreatment);

module.exports = router;
