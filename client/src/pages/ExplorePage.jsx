import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "query") {
      setQuery(e.target.value);
    } else {
      setCode(e.target.value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(query);
    setQuery("");
    setCode("");
  };
  return (
    <div className=" h-full bg-[#f8f9fb] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl font-semibold tracking-tight mt-5 text-gray-900 mb-3">
          Discuss your backend code with Opti-Core ?
        </h1>

        <p className="text-gray-600 mb-10 text-center max-w-xl">
          Enter your backend code, query, or performance concern. Opti-Core will
          analyze it and generate optimization insights.
        </p>

        <div className="w-full max-w-2xl relative">
          <textarea
            rows={4}
            name="query"
            onChange={handleChange}
            placeholder="Paste your backend code or describe the issue..."
            value={query}
            className="w-full resize-none rounded-xl border border-gray-300 bg-white p-4 pr-12 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleClick}
            className="absolute bottom-3 right-3 bg-gray-600 hover:bg-gray-700 cursor-pointer text-white p-2 rounded-lg shadow"
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </div>

      <div className="py-4 text-center text-xs text-gray-400">
        Opti-Core · Backend Code Optimization Engine
      </div>
    </div>
  );
}
