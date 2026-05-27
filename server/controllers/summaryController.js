const Groq = require("groq-sdk");

const groq =
new Groq({

apiKey:
process.env.GROQ_API_KEY

});

exports.generateSummary =
async(req,res)=>{

try{

const {

tool,
teamSize,
potentialSavings,
monthlyCost

}=req.body;


const chat =
await groq.chat.completions.create({

messages:[

{

role:"user",

content: `
Tool: ${tool}
Team size: ${teamSize}
Monthly spend: $${monthlyCost}
Potential savings: $${potentialSavings}

Give a 2-line business recommendation.
Mention whether the tool is worth keeping,
downgrading, or replacing.
`

}

],

model:

"llama-3.3-70b-versatile"

});


res.json({

summary:

chat.choices[0]

.message.content

});

}

catch(err){

console.log(err);

res.status(500)

.json({

error:

"Summary failed"

});

}

};