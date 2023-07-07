"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
// import { Plus, FilePdf, X } from "react-feather"; // Import icons from Feather Icons
import {
  Plus,
  File,
  X,
  Image as ImageIcon,
} from "lucide-react";

export default function DisplayBox() {
  const [content, setContent] = useState(null); // set initial content to null
  const [files, setFiles] = useState([]);
  const [indexStatus, setIndexStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editable: false, // Make the editor read-only
    autofocus: false, // Don't focus the editor on load
  });

  // Handle file input change
  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...fileList]);
  };

  // Handle file remove
  const handleFileRemove = (removeIndex) => {
    setFiles((prevFiles) => prevFiles.filter((file, index) => index !== removeIndex));
  };

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
      setIndexStatus("Indexing..."); // set status to "Checking..." at the start of the API call
      const apiResponse = null; // replace this with your API call
      setContent(apiResponse);
      setIndexStatus("Indexed"); // set status to "Checked" after the API call is completed
    }
    fetchContent();
  }, []);

  return (
    <div className="relative h-[92.5vh] w-[22.5%] border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-4 sm:shadow-lg">
      {/* Add a file button */}
      <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {indexStatus}
      </div>
      <label className="flex text-stone-400 items-center space-x-2 cursor-pointer">
        <Plus /> <span>Add a file</span>
        <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
      </label>

      {/* Display list of files */}
      <ul className="space-y-2 mt-4">
        {files.map((file, index) => (
          <li key={file.name + index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <File />
              <span className="truncate" title={file.name}>
                {file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}
              </span>
            </div>
            <X className="cursor-pointer hover:text-red-500 h-4 w-4" onClick={() => handleFileRemove(index)} />
          </li>
        ))}
      </ul>
    </div>
);

}
