import { Editor } from "@tiptap/core";
import { FC, useState } from "react";
import { useCompletion } from "ai/react";
import { toast } from "sonner";
import va from "@vercel/analytics";
import LoadingCircle from "@/ui/shared/loading-circle";
import { Minimize } from "lucide-react";
import Magic from "@/ui/shared/magic";

interface SenseCheckSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: () => void;
}

export const SenseCheckSelector: FC<SenseCheckSelectorProps> = ({ editor, isOpen, setIsOpen }) => {
  const { complete, isLoading } = useCompletion({
    id: "novel",
    api: "/api/generate",
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate Limit Reached");
        return;
      }
      editor.chain().focus().run();
    },
    onFinish: (_prompt, completion) => {
      // highlight the generated text
      const range = editor.state.selection;
      editor.commands.setTextSelection({
        from: range.from,
        to: range.from + completion.length,
      });
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
  });

  return (
    <button
      className={`relative flex items-center justify-center p-2 ${
        isOpen ? "bg-stone-100" : ""
      }`}
      onMouseDown={(e) => {
        e.preventDefault();
        setIsOpen();
        complete(editor.getText());
      }}
    >
      <Magic className="w-5 h-5" />
      <text> Sense check </text>
      {isOpen && isLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <LoadingCircle />
        </div>
      )}
    </button>
  );
};
