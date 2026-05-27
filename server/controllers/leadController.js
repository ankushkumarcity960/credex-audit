const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

exports.saveLead = async (req, res) => {
  try {
    const { email, companyName, role, teamSize, auditId, totalSavings } = req.body;

    const { error } = await supabase
      .from('leads')
      .insert([{ id: uuidv4(), audit_id: auditId, email, company_name: companyName, role, team_size: teamSize }]);

    if (error) throw error;

    await resend.emails.send({

from:'onboarding@resend.dev',

to:email,

subject:'Your AI Spend Audit Report',

html:`

<h2>Your AI Spend Audit is ready!</h2>

<p>

We found potential savings of

<strong>

$${totalSavings}/month

</strong>

</p>

<p>

The Credex team will reach out shortly.

</p>

`

});

    res.json({ success: true });
  } 
  catch (err) {

console.log("LEAD ERROR:", err);

res.status(500).json({
error: err.message
});

}
};
