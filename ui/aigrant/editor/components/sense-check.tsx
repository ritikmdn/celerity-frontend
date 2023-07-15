import { Editor } from "@tiptap/core";
import { FC, useState } from "react";
import { useEffect, useRef, useContext } from "react";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
import LoadingCircle from "@/ui/shared/loading-circle";
import Magic from "@/ui/shared/magic";
import CompletionContext from '@/ui/aigrant/shared/context';
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
    console.log('onFinish (debounced):', apicompletion);
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
        console.log('onFinish:', apicompletion);
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
        complete(editor.getText());
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
