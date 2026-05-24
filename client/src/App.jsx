import { useState } from "react";

function App() {

const [teamSize,setTeamSize]=useState("");
const [useCase,setUseCase]=useState("");
const [tool,setTool]=useState("");

const handleSubmit=(e)=>{
e.preventDefault();

alert(`
Team Size: ${teamSize}
Use Case: ${useCase}
Tool: ${tool}
`);
};

return(

<div className="min-h-screen bg-gray-100 p-8">

<h1 className="text-4xl font-bold text-center mb-3">
AI Spend Audit
</h1>

<p className="text-center text-gray-500 mb-8">
Find AI overspending
</p>

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow max-w-xl mx-auto"
>

<label>Team Size</label>

<input
type="number"
value={teamSize}
onChange={(e)=>setTeamSize(e.target.value)}
className="border p-3 w-full mb-5 rounded"
/>

<label>Use Case</label>

<select
value={useCase}
onChange={(e)=>setUseCase(e.target.value)}
className="border p-3 w-full mb-5 rounded"
>

<option>Coding</option>
<option>Writing</option>
<option>Research</option>

</select>


<label>AI Tool</label>

<select
value={tool}
onChange={(e)=>setTool(e.target.value)}
className="border p-3 w-full mb-5 rounded"
>

<option>Select Tool</option>

<option>ChatGPT</option>
<option>Claude</option>
<option>Cursor</option>
<option>Gemini</option>
<option>Github Copilot</option>
<option>Windsurf</option>

</select>


<button
className="bg-blue-500 text-white p-3 rounded w-full"
>

Run Audit

</button>

</form>

</div>

)

}

export default App;