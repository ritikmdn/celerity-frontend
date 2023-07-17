import { Editor } from "@tiptap/core";
import { FC, useState } from "react";
import { useEffect, useRef, useContext } from "react";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
import LoadingCircle from "@/ui/shared/loading-circle";
import Magic from "@/ui/shared/magic";
import CompletionContext from '@/ui/shared/context';
import { useDebouncedCallback } from "use-debounce"; // import useDebouncedCallback

interface SenseCheckSelectorProps {
  editor: Editor;
}

export const SenseCheckSelector: FC<SenseCheckSelectorProps> = ({
  editor,
}) => {

  const { completion, setCompletion } = useContext(CompletionContext)!; // access CompletionContext

  // use debounce for setting completion
  const debouncedSetCompletion = useDebouncedCallback((apicompletion) => {
    setCompletion(apicompletion);
  }, 500);

  const { complete, isLoading } = useCompletion({
    id: "celerity",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate Limit Reached");
        return;
      }
      editor.chain().focus().run();
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

  return (
    <button
      className="relative flex items-center justify-center p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
      onMouseDown={(e) => {
        e.preventDefault();
        if (!editor) {
          console.error("Editor doesn't exist");
          return;
        }
      
        let selectedText = '';
      
        if (editor.state.selection.empty) {
          console.error("No text selected");
          return;
        } else {
          const { from, to } = editor.state.selection;
          selectedText = editor.state.doc.textBetween(from, to);
        }
        console.log("selectedText:", selectedText);
        complete(selectedText);
      }}
    >
      <Magic className="w-5 h-5" />
      <span className="hidden sm:inline-block ml-2">Sense check</span>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <LoadingCircle />
        </div>
      )}
    </button>
  );
};
