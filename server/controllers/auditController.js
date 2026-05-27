const { v4: uuidv4 } = require("uuid");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const pricing =
require("../db/pricingData");




/* ---------- RUN AUDIT + SAVE ---------- */

exports.runAudit = async (req, res) => {

  try {

    const { teamSize, tool } = req.body;

    const monthlyCost =
      pricing[tool] * teamSize;

    const potentialSavings =
      monthlyCost * 0.2;

    const auditId = uuidv4();

  const { error } =
await supabase

.from("audits")

.insert([{

id: auditId,

teamSize,

tool,

monthlyCost,

potentialSavings,

created_at: new Date()

}]);


if(error){

console.log(
"SUPABASE ERROR:",
error
);

throw error;

}

    res.json({

      auditId,

      teamSize,

      tool,

      monthlyCost,

      potentialSavings

    });

  }

  

catch(err){

console.log(
"AUDIT ERROR:",
err
);

res.status(500).json({

error:
err.message

});

}

};



/* ---------- SAVE AUDIT ---------- */

exports.saveAudit =
async(req,res)=>{

try{

const auditId =
uuidv4();

const { error } =
await supabase

.from("audits")

.insert([{

id:auditId,

...req.body,

created_at:
new Date()

}]);


if(error)
throw error;


res.json({
auditId
});

}

catch(err){

res.status(500).json({

error:
err.message

});

}

};



/* ---------- GET SINGLE AUDIT ---------- */

exports.getAudit =
async(req,res)=>{

try{

const { data,error } =
await supabase

.from("audits")

.select("*")


.order(
"created_at",
{ ascending:false }
)

.eq(
"id",
req.params.id
)

.single();


if(error)
throw error;


res.json(data);

}

catch(err){

res.status(404).json({

error:
"Audit not found"

});

}

};



/* ---------- GET HISTORY ---------- */

exports.getHistory =
async(req,res)=>{

try{

const { data,error } =
await supabase

.from("audits")

.select("*")

.order(
"created_at",
{ ascending:false }
);

if(error)
throw error;

res.json(data);

}

catch(err){

res.status(500).json({

error:
err.message

});

}

};

/* ---------- DELETE AUDIT ---------- */

exports.deleteAudit =
async(req,res)=>{

try{

const { error } =
await supabase

.from("audits")

.delete()

.eq(
"id",
req.params.id
);

if(error)
throw error;

res.json({

message:
"Deleted"

});

}

catch(err){

res.status(500).json({

error:
err.message

});

}

};