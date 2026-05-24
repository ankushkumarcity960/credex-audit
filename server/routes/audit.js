const express = require('express');
const router = express.Router();
const { saveAudit, getAudit } = require('../controllers/auditController');

router.post('/', saveAudit);
router.get('/:id', getAudit);

module.exports = router;
