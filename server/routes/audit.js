const express =
require("express");

const router =
express.Router();


const {

runAudit,
saveAudit,
getAudit,
getHistory,
deleteAudit

}

=

require(
"../controllers/auditController"
);


/* Run Audit */

router.post(
"/run",
runAudit
);


/* Save Audit */

router.post(
"/save",
saveAudit
);


/* Get History */

router.get(
"/history",
getHistory
);


/* Get One Audit */

router.get(
"/:id",
getAudit
);

router.delete(

"/:id",

deleteAudit

);


module.exports =
router;