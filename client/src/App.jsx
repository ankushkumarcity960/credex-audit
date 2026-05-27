import { useState,useEffect } from "react";
import axios from "axios";
import { supabase }

from "./supabase";
import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,

PieChart,
Pie,
Cell,
Legend

}

from "recharts";


function App() {

const [teamSize,setTeamSize]=useState("");
const [tool,setTool]=useState("");
const [company,setCompany]=useState("");
const [role,setRole]=useState("");
const [summary,
setSummary]

=

useState("");
const [result,setResult]=useState(null);
const [history,setHistory]=useState([]);
const [search,setSearch]=useState("");
const [sort,setSort]=useState("latest");
const [dark,setDark]=useState(false);
const [loading,setLoading]=useState(false);
const [email,setEmail]
=
useState("");

const [password,setPassword]
=
useState("");

const [user,setUser]
=
useState(null);

const [success,setSuccess]=useState("");

const fetchHistory =
async()=>{

try{

const res =
await axios.get(

"https://credex-backend-zhpg.onrender.com/api/audit/history"

);

setHistory(
res.data
);

}

catch(err){

console.log(err);

}

};

useEffect(()=>{

fetchHistory();

checkUser();

},[]);

const checkUser =
async()=>{

const {

data

}

=

await supabase.auth

.getUser();

setUser(
data.user
);

};

const login =
async()=>{

const {

error

}

=

await supabase.auth

.signInWithPassword({

email,

password

});

if(error){

alert(
error.message
);

}

else{

const {

data

}

=

await supabase.auth

.getUser();

setUser(
data.user
);

alert(
"Login successful"
);

}

};


const handleSubmit=async(e)=>{

e.preventDefault();

if(

!teamSize ||

!tool

){

alert(

"Enter team size and select tool"

);

return;

}

try{

setLoading(true);

const res =
await axios.post(

"https://credex-backend-zhpg.onrender.com/api/audit/run",
{
teamSize:Number(teamSize),
tool
}

);

setResult(res.data);

const summaryRes =

await axios.post(

"https://credex-backend-zhpg.onrender.com/api/summary",
{

tool,

teamSize,

potentialSavings:

res.data.potentialSavings,

monthlyCost:

res.data.monthlyCost

}

);

setSummary(

summaryRes.data.summary

);

await fetchHistory();

setSuccess(
"Audit saved successfully"
);

setTimeout(()=>{

setSuccess("");

},2000);

setLoading(false);

}

catch(err){

    setLoading(false);

console.log(err);

}

};

const deleteAudit =
async(id)=>{

try{

await axios.delete(

`https://credex-backend-zhpg.onrender.com/api/audit/${id}`

);

fetchHistory();

}

catch(err){

console.log(err);

}

};

const downloadCSV = ()=>{

const rows = [

["Tool","Team","Cost","Savings"],

...history.map(

item=>([

item.tool,

item.teamSize,

item.monthlyCost,

item.potentialSavings

])

)

];



const csvContent =

rows.map(

row=>

row.join(",")

).join("\n");


const blob =
new Blob(

[csvContent],

{

type:
"text/csv"

}

);


const url =
URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download =
"audit-history.csv";

a.click();

};

if(!user){

return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100">

<div className="
bg-white
p-6
rounded
shadow
w-96">

<h2 className="
text-2xl
font-bold
mb-4
text-center">

Login

</h2>


<input

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

className="
border
p-3
w-full
mb-3
rounded"

/>


<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

className="
border
p-3
w-full
mb-3
rounded"

/>


<button

onClick={login}

className="
bg-black
text-white
p-3
rounded
w-full"

>

Login

</button>

</div>

</div>

);

}

const handleLeadSubmit = async () => {

try {

await axios.post(

"https://credex-backend-zhpg.onrender.com/api/leads",
{

email,

companyName: company,

role,

teamSize,

auditId: result.auditId,

totalSavings:

result.potentialSavings

}

);

alert("Lead saved!");

setEmail("");
setCompany("");
setRole("");

}

catch(err){

alert("Audit failed");

console.log(err);

alert("Error saving lead");

}

};



return(

<div className={`

min-h-screen
p-8

${

dark

?

"bg-gray-900 text-white"

:

"bg-gray-100"

}

`}>




<div className="
flex
justify-between
items-center
max-w-6xl
mx-auto
mb-10">

<div>

<h1 className="
text-5xl
font-bold">

AI Spend Audit

</h1>


</div>


<div className="flex gap-4">

<button

onClick={()=>

setDark(!dark)

}

className="
bg-black
text-white
px-4
py-2
rounded"

>

{dark ? "Light Mode" : "Dark Mode"}

</button>


<button

onClick={async()=>{

await supabase.auth.signOut();

setUser(null);

}}

className="
bg-red-500
text-white
px-4
py-2
rounded"

>

Logout

</button>

</div>

</div>

<div className="
grid
grid-cols-3
gap-4
max-w-xl
mx-auto
mb-8">

<div className={`

p-4
rounded
shadow

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>

<p className={

dark

?

"text-gray-300"

:

"text-gray-500"

}>

Total Audits

</p>

<h2 className="
text-2xl
font-bold">

{history.length}

</h2>

</div>



<div className={`

p-4
rounded
shadow

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>

<p className="
text-gray-500">

Total Spend

</p>

<h2 className="
text-2xl
font-bold
text-blue-600">

$

{

history.reduce(

(sum,item)=>

sum +
item.monthlyCost,

0

)

}

</h2>

</div>


<div className={`

p-4
rounded
shadow

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>

<p className="
text-gray-500">

Savings

</p>

<h2 className="
text-2xl
font-bold
text-green-600">

$

{

history.reduce(

(sum,item)=>

sum +
item.potentialSavings,

0

)

}

</h2>

</div>

</div>

{

success && (

<div className="
bg-green-500
text-white
p-3
rounded
max-w-xl
mx-auto
mb-4">

✅ {success}

</div>

)

}


<form
onSubmit={handleSubmit}
className={`

p-8
rounded-xl
shadow
max-w-xl
mx-auto

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>


<label>Team Size</label>

<input
type="number"
value={teamSize}
onChange={(e)=>
setTeamSize(e.target.value)
}
className={`

border
p-3
w-full
mb-5
rounded

${

dark

?

"bg-gray-700 text-white"

:

"bg-white text-black"

}

`}/>



<label>Tool</label>

<select

value={tool}

onChange={(e)=>
setTool(e.target.value)
}

className={`

border
p-3
w-full
mb-5
rounded

${

dark

?

"bg-gray-700 text-white"

:

"bg-white text-black"

}

`}
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

<option value="Gemini">
Gemini
</option>

<option value="GitHub Copilot">
GitHub Copilot
</option>

<option value="Perplexity">
Perplexity
</option>

<option value="Notion AI">
Notion AI
</option>


</select>



<button

disabled={loading}

type="submit"

className="
bg-blue-500
text-white
p-3
rounded
w-full"

>

{

loading

?

"Loading..."

:

"Run Audit"

}
</button>

</form>



{

result &&
result.monthlyCost && (


<div className={`

mt-8
p-6
rounded
shadow
max-w-xl
mx-auto

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>
<h2 className="text-2xl font-bold mb-4">

Results

</h2>

<p>
Monthly Cost: ${result.monthlyCost}
</p>

<p>
Potential Savings: ${result.potentialSavings}
</p>

<p className="text-purple-600 font-bold">

Annual Savings:

$

{

result.potentialSavings * 12

}

</p>

<p className="text-yellow-400 font-bold">

Recommendation:

{

result.teamSize <= 5

?

"Use individual plans to reduce cost"

:

"Team plan is justified"

}

</p>

<p className="text-sm text-gray-400">

{

result.teamSize <= 5

?

"Small teams usually overspend on premium subscriptions."

:

"Larger teams benefit from collaboration features."

}

</p>

</div>

)}

{
summary && (

<div
className={`

mt-6
p-6
rounded
shadow
max-w-xl
mx-auto

${

dark

?

"bg-gray-800 text-white"

:

"bg-white text-black"

}

`}

>

<h2 className="
text-xl
font-bold
mb-3">

AI Summary

</h2>

<p
className={

dark

?

"text-gray-300"

:

"text-gray-700"

}

>

{summary}

</p>

</div>

)

}

{

result && (

<div className={`

mt-6
p-6
rounded
shadow
max-w-xl
mx-auto

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>

<h2 className="font-bold text-2xl mb-4">

Get Full Report

</h2>


<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(e.target.value)

}

className={`

border
p-3
w-full
mb-3
rounded

${

dark

?

"bg-gray-700 text-white"

:

"bg-white text-black"

}

`}
/>


<input

placeholder="Company"

value={company}

onChange={(e)=>

setCompany(e.target.value)

}

className={`

border
p-3
w-full
mb-3
rounded

${

dark

?

"bg-gray-700 text-white"

:

"bg-white text-black"

}

`}
/>


<input

placeholder="Role"

value={role}

onChange={(e)=>

setRole(e.target.value)

}

className={`

border
p-3
w-full
mb-3
rounded

${

dark

?

"bg-gray-700 text-white"

:

"bg-white text-black"

}

`}
/>


<button

onClick={handleLeadSubmit}

className="
bg-green-500
text-white
w-full
p-3
rounded">

Save Lead

</button>

</div>

)

}

<div className={`

mt-8
p-6
rounded
shadow
max-w-xl
mx-auto

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>

<div className="
flex
justify-between
items-center
mb-4">

<h2 className="
text-2xl
font-bold">

Audit History

</h2>

<div className="flex gap-2">

<select

value={sort}

onChange={(e)=>

setSort(
e.target.value
)

}

className={`

border
p-2
rounded

${

dark

?

"bg-gray-700 text-white"

:

"bg-white text-black"

}

`}

>

<option value="latest">

Latest

</option>

<option value="high">

Highest Cost

</option>

<option value="low">

Lowest Cost

</option>

</select>

<input

type="text"

placeholder="Search..."

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

className={`

border
p-2
rounded

${

dark

?

"bg-gray-700 text-white"

:

"bg-white text-black"

}

`}

/>


<button

onClick={downloadCSV}

className="
bg-green-500
text-white
px-4
py-2
rounded"

>

Export CSV

</button>

</div>

</div>


    {
history.length===0 && (

<p
className={

dark

?

"text-gray-400 mb-4"

:

"text-gray-500 mb-4"

}

>

No audits yet

</p>

)
}



{

history

.filter(

item=>

item.tool

.toLowerCase()

.includes(

search.toLowerCase()

)

)

.sort(

(a,b)=>{

if(sort==="high")

return b.monthlyCost-a.monthlyCost;

if(sort==="low")

return a.monthlyCost-b.monthlyCost;

return 0;

}

)

.map(

(item,index)=>(



<div
key={index}
className="mb-3"
>

<div className="
flex
justify-between
items-center">

<div>

<p className="font-semibold">

{item.tool}

</p>

<p className="text-gray-500">

Team:
{item.teamSize}

</p>

<p className="
text-sm
text-gray-400">

{
new Date(
item.created_at
).toLocaleDateString()
}

</p>

<p className="
text-green-600
text-sm">

Saved:
${item.potentialSavings}

</p>



</div>


<div>

<div>

<p className="
font-bold
text-blue-600">

${item.monthlyCost}

</p>


<button

onClick={()=>{

const confirmDelete =

window.confirm(

"Delete this audit?"

);

if(confirmDelete){

deleteAudit(
item.id
);

}

}}

className="
text-red-500
text-sm
mt-2"

>

Delete

</button>

</div>

</div>

</div>


<hr className="my-3"/>

</div>

))

}

</div>

<div className={`

mt-8
p-6
rounded
shadow
max-w-xl
mx-auto

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>

<h2 className="
text-2xl
font-bold
mb-4">

Spend Chart

</h2>


<BarChart

width={500}

height={250}

data={history}

>


<CartesianGrid
strokeDasharray="3 3"
/>

<XAxis

dataKey="tool"

stroke={

dark

?

"white"

:

"black"

}

/>

<YAxis

stroke={

dark

?

"white"

:

"black"

}

/>
<Tooltip

formatter={(value)=>

[`$${value}`,"Cost"]

}

/>
<Bar

dataKey="monthlyCost"

fill="#3B82F6"

radius={[8,8,0,0]}

/>

</BarChart>

</div>

<div className={`

mt-8
p-6
rounded
shadow
max-w-xl
mx-auto

${

dark

?

"bg-gray-800 text-white"

:

"bg-white"

}

`}>

<h2 className="
text-2xl
font-bold
mb-4">

Tool Usage

</h2>


<PieChart
width={400}
height={300}
>

<Pie

data={history}

dataKey="monthlyCost"

nameKey="tool"

outerRadius={100}

label

>

<Cell fill="#3B82F6"/>

<Cell fill="#10B981"/>

<Cell fill="#F59E0B"/>

<Cell fill="#EF4444"/>

</Pie>

<Legend/>

<Tooltip/>

</PieChart>

</div>

</div>


);

}

export default App;