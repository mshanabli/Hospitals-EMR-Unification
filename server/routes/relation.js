const { Router } = require('express');
const {
  addRelation,
  getRelationsByHospitalId,
} = require('../controllers/relation');

const router = Router();

router.post('/', addRelation);
router.get('/:id', getRelationsByHospitalId);

module.exports = router;
