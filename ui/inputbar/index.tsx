// celerity-frontend/ui/inputBar.tsx

'use client';

import { useState, useEffect } from "react";
import { ArrowRightCircle } from "lucide-react";

export default function InputBar() {
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle the submit event here, inputValue holds the current input
    console.log(inputValue);
    setInputValue("");
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const charCount = inputValue.length;
    setRows(Math.min(3, Math.floor(charCount / 30) + 1));
  }, [inputValue]);

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2 ">
      <textarea
        value={inputValue}
        onChange={handleChange}
        className="flex-grow rounded-lg border border-gray-300 p-2 resize-none overflow-auto focus:outline-red-500" // disable resize
        placeholder="Ask Celerity..."
        rows={rows}
      />
      <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        <ArrowRightCircle className="h-6 w-6" />
      </button>
    </form>
  );
}
