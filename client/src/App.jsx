import { useState } from "react";
import axios from "axios";

function App() {

const [teamSize,setTeamSize]=useState("");
const [tool,setTool]=useState("");

const [result,setResult]=useState(null);


const handleSubmit=async(e)=>{

e.preventDefault();

try{

const res =
await axios.post(

"http://localhost:5000/api/audit/run",

{
teamSize:Number(teamSize),
tool
}

);

setResult(res.data);

}

catch(err){

console.log(err);

}

};



return(

<div className="min-h-screen bg-gray-100 p-8">

<h1 className="text-4xl font-bold text-center mb-8">

AI Spend Audit

</h1>


<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow max-w-xl mx-auto"
>


<label>Team Size</label>

<input
type="number"
value={teamSize}
onChange={(e)=>
setTeamSize(e.target.value)
}
className="border p-3 w-full mb-5 rounded"
/>



<label>Tool</label>

<select

value={tool}

onChange={(e)=>
setTool(e.target.value)
}

className="border p-3 w-full mb-5 rounded"

>

<option value="">
Select Tool
</option>

<option value="ChatGPT">
ChatGPT
</option>

<option value="Claude">
Claude
</option>

<option value="Cursor">
Cursor
</option>

</select>



<button
className="bg-blue-500 text-white p-3 rounded w-full"
>

Run Audit

</button>

</form>



{result && (

<div className="bg-white mt-8 p-6 rounded shadow max-w-xl mx-auto">

<h2 className="text-2xl font-bold mb-4">

Results

</h2>

<p>
Monthly Cost:
${result.monthlyCost}
</p>

<p>
Potential Savings:
${result.potentialSavings}
</p>

</div>

)}


</div>

);

}

export default App;