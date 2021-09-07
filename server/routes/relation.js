const { Router } = require('express');
const {
  addRelation,
  getRelationsByTableByHospitalId,
} = require('../controllers/relation');

const router = Router();

router.post('/', addRelation);
router.get('/:table/:id', getRelationsByTableByHospitalId);

module.exports = router;
