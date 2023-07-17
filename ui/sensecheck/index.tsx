"use client";

import { useEffect, useState, useContext } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import CompletionContext from '@/ui/shared/context';

export default function DisplayBox() {
  const [content, setContent] = useState(null); // set initial content to null
  const [checkStatus, setCheckStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const { completion } = useContext(CompletionContext)!;

  const editor = useEditor({
    extensions: TiptapExtensions,
    editable: false, // Make the editor read-only
    autofocus: false, // Don't focus the editor on load
  });

  useEffect(() => {
    if (editor && completion) {
      console.log("completion:", completion);
      editor.commands.setContent(completion);
    }
  }, [editor, completion]);  

  return (
    <div className="sticky top-0 right-0 h-full py-12 w-[30%] bg-white border-stone-200 p-8 sm:rounded-lg sm:border sm:px-8 sm:shadow-lg">
      {/* <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {checkStatus}
      </div> */}
      {/* {editor && <EditorBubbleMenu editor={editor} />} */}
      <EditorContent editor={editor} />
      {/* {content === null && <div className="italic text-gray-400">Sense check by highlighting the text</div>} Placeholder when content is null */}
    </div>
  );
}
