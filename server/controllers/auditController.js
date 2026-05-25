const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const pricing = {
  ChatGPT: 20,
  Claude: 20,
  Gemini: 19,
  Cursor: 20,
  "Github Copilot": 10,
  Windsurf: 15
};


/* ---------- AUDIT CALCULATION ---------- */

exports.runAudit = async (req, res) => {

  try {

    const { teamSize, tool } = req.body;

    const monthlyCost =
      pricing[tool] * teamSize;

    const potentialSavings =
      monthlyCost * 0.2;

    res.json({

      teamSize,
      tool,
      monthlyCost,
      potentialSavings

    });

  }

  catch(err){

    res.status(500).json({
      error: err.message
    });

  }

};



/* ---------- SAVE AUDIT ---------- */

exports.saveAudit = async (req, res) => {

  try {

    const auditId = uuidv4();

    const { error } =
      await supabase
      .from('audits')
      .insert([{

        id: auditId,
        ...req.body,
        created_at: new Date()

      }]);

    if(error) throw error;

    res.json({ auditId });

  }

  catch(err){

    res.status(500).json({
      error: err.message
    });

  }

};



/* ---------- GET AUDIT ---------- */

exports.getAudit = async (req,res)=>{

  try{

    const { data,error }
    = await supabase

    .from('audits')

    .select('*')

    .eq(
      'id',
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
      'Audit not found'

    });

  }

};