// celerity-frontend/ui/inputBar.tsx

'use client';

import { useState, useEffect, useContext} from "react";
import { ArrowRightCircle } from "lucide-react";
import CompletionContext from '@/ui/shared/context';
import { toast } from "sonner";
import va from "@vercel/analytics";
import { useDebouncedCallback } from "use-debounce"; // import useDebouncedCallback
import { useCompletion } from "ai/react";
import LoadingCircle from "@/ui/shared/loading-circle";

export default function InputBar() {
  const [inputValue, setInputValue] = useState("");
  const [rows, setRows] = useState(1);
  const { completion, setCompletion } = useContext(CompletionContext)!; // access CompletionContext

  // use debounce for setting completion
  const debouncedSetCompletion = useDebouncedCallback((apicompletion) => {
    setCompletion(apicompletion);
  }, 500);

  const { complete, isLoading } = useCompletion({
    id: "celerity",
    api: "/api/ask",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate Limit Reached");
        return;
      }
    },
    onFinish: (_prompt, apicompletion) => {
      if (apicompletion !== "") {
        debouncedSetCompletion(apicompletion);
      }
    },         
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle the submit event here, inputValue holds the current input
    console.log(inputValue);
    complete(inputValue);
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
        {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-stone-500 bg-opacity-10 flex items-center justify-center">
          <LoadingCircle />
        </div>
      )}
      </button>
    </form>
  );
}
