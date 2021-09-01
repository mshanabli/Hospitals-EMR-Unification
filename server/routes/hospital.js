const { Router } = require('express');
const { addHospital, getAllHospitals } = require('../controllers/hospital');

const router = Router();

router.post('/', addHospital);
router.get('/', getAllHospitals);

module.exports = router;
