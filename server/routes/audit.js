const express = require("express");

const router =
express.Router();

const {

runAudit,
saveAudit,
getAudit

} = require(
"../controllers/auditController"
);


router.post(
"/run",
runAudit
);

router.post(
"/save",
saveAudit
);

router.get(
"/:id",
getAudit
);


module.exports =
router;