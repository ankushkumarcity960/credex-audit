import { useState } from "react";

function App() {

  const [teamSize, setTeamSize] = useState("");
  const [useCase, setUseCase] = useState("");
  const [tool, setTool] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`
Team Size: ${teamSize}
Use Case: ${useCase}
Tool: ${tool}
`);
  };

  return (
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

        {/* Team Size */}
        <label className="block mb-2">
          Team Size
        </label>

        <input
          type="number"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          placeholder="Enter team size"
          className="border p-3 w-full mb-5 rounded"
        />


        {/* Use Case */}
        <label className="block mb-2">
          Use Case
        </label>

        <select
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          className="border p-3 w-full mb-5 rounded"
        >

          <option value="">
            Select Use Case
          </option>

          <option value="Coding">
            Coding
          </option>

          <option value="Writing">
            Writing
          </option>

          <option value="Research">
            Research
          </option>

        </select>


        {/* AI Tool */}
        <label className="block mb-2">
          AI Tool
        </label>

        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
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

          <option value="Gemini">
            Gemini
          </option>

          <option value="Github Copilot">
            Github Copilot
          </option>

          <option value="Windsurf">
            Windsurf
          </option>

        </select>


        <button
          className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600"
        >
          Run Audit
        </button>

      </form>

    </div>
  );
}

export default App;