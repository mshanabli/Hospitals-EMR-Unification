const { Router } = require('express');
const { addColumn, getColumnsByIsTarget } = require('../controllers/column');

const router = Router();

router.post('/', addColumn);
router.get('/:key', getColumnsByIsTarget);

module.exports = router;
