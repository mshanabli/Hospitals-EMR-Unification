const { Router } = require('express');
const { addColumn, getColumnsByHospitalId } = require('../controllers/column');

const router = Router();

router.post('/', addColumn);
router.get('/:id', getColumnsByHospitalId);

module.exports = router;
