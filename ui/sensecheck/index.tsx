"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
// import { EditorBubbleMenu } from "./components";

export default function DisplayBox() {
  const [content, setContent] = useState(null); // set initial content to null
  const [checkStatus, setCheckStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editable: false, // Make the editor read-only
    autofocus: false, // Don't focus the editor on load
  });

  // Hydrate the display box with the content from API.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  // Call your API and set the content when component mounts
  useEffect(() => {
    async function fetchContent() {
      setCheckStatus("Checking..."); // set status to "Checking..." at the start of the API call
      const apiResponse = null; // replace this with your API call
      setContent(apiResponse);
      setCheckStatus("Checked"); // set status to "Checked" after the API call is completed
    }
    fetchContent();
  }, []);

  return (
    <div className="relative h-[92.5vh] w-[22.5%] border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-4 sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {checkStatus}
      </div>
      {/* {editor && <EditorBubbleMenu editor={editor} />} */}
      <EditorContent editor={editor} />
      {content === null && <div className="italic text-gray-400">Sense check by highlighting the text</div>} {/* Placeholder when content is null */}
    </div>
  );
}
