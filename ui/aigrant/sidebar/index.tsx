"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import {
  File,
  Plus,
  X,
} from "lucide-react";

// Define a custom FileData type
type FileData = {
  name: string;
  url: string;
}

// Initial dummy data
const initialFiles: FileData[] = [
  { name: 'Bain-India-fintech-report-2022.pdf', url: 'https://cxnzygtdltxddytmsxrs.supabase.co/storage/v1/object/sign/pdf-documents/Bain-India-fintech-report-2022.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYtZG9jdW1lbnRzL0JhaW4tSW5kaWEtZmludGVjaC1yZXBvcnQtMjAyMi5wZGYiLCJpYXQiOjE2ODkwMTkzMTcsImV4cCI6MTY5MTYxMTMxN30.LKixfKiS6crF7jcxMMyaUt-av28iuSHqvMD94hHlSfM&t=2023-07-10T20%3A01%3A57.582Z' },
  { name: 'BCG-Future-of-fintech-july-2022.pdf', url: 'https://cxnzygtdltxddytmsxrs.supabase.co/storage/v1/object/sign/pdf-documents/BCG-Future-of-fintech-july-2022.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYtZG9jdW1lbnRzL0JDRy1GdXR1cmUtb2YtZmludGVjaC1qdWx5LTIwMjIucGRmIiwiaWF0IjoxNjg5MDE5MjYyLCJleHAiOjE2OTE2MTEyNjJ9.bA-rdySyoJyWzFkuFWgpvldlnnfPYjDkGmTsHwv1aR8&t=2023-07-10T20%3A01%3A01.978Z' },
  { name: 'EY-Winds-of-change-India-fintech-report-2022.pdf', url: 'https://cxnzygtdltxddytmsxrs.supabase.co/storage/v1/object/sign/pdf-documents/EY-Winds-of-change-India-fintech-report-2022.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYtZG9jdW1lbnRzL0VZLVdpbmRzLW9mLWNoYW5nZS1JbmRpYS1maW50ZWNoLXJlcG9ydC0yMDIyLnBkZiIsImlhdCI6MTY4OTAxOTM2MCwiZXhwIjoxNjkxNjExMzYwfQ.DQxmGQDEoeGJ6dWDwvIbGLshn-_LLnt57NXvWQ4su3g&t=2023-07-10T20%3A02%3A40.284Z' },
  { name: 'Inc42-State-of-Indian-fintech-report-q1-2023.pdf', url: 'https://cxnzygtdltxddytmsxrs.supabase.co/storage/v1/object/sign/pdf-documents/Inc42-State-of-Indian-fintech-report-q1-2023.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYtZG9jdW1lbnRzL0luYzQyLVN0YXRlLW9mLUluZGlhbi1maW50ZWNoLXJlcG9ydC1xMS0yMDIzLnBkZiIsImlhdCI6MTY4OTAxOTUwMCwiZXhwIjoxNjkxNjExNTAwfQ.YH-rQ6O3hGzLkfo7wr26Dw23xbjDf22mPluxqdLW41Q&t=2023-07-10T20%3A05%3A00.382Z' },
  { name: 'Digital-Fifth-India-fintech-funding-acquisition-report-2022-23.pdf', url: 'https://cxnzygtdltxddytmsxrs.supabase.co/storage/v1/object/sign/pdf-documents/Digital-Fifth-India-fintech-funding-acquisition-report-2022-23.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwZGYtZG9jdW1lbnRzL0RpZ2l0YWwtRmlmdGgtSW5kaWEtZmludGVjaC1mdW5kaW5nLWFjcXVpc2l0aW9uLXJlcG9ydC0yMDIyLTIzLnBkZiIsImlhdCI6MTY4OTAxOTUyOSwiZXhwIjoxNjkxNjExNTI5fQ.ZnUwsqP5spP0MELUfVOkVHKC2Waao0BhW-qbIeaJhYA&t=2023-07-10T20%3A05%3A29.900Z' },
];

export default function DisplayBox() {
  const [content, setContent] = useState(null); // set initial content to null
  const [files, setFiles] = useState<FileData[]>(initialFiles); // set initial files
  const [indexStatus, setIndexStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editable: false, // Make the editor read-only
    autofocus: false, // Don't focus the editor on load
  });

  // Handle file remove
  const handleFileRemove = (removeIndex: number) => {
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
    <div className="relative h-[87.5vh] w-[22.5%] border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-4 sm:shadow-lg">
      {/* Add a file button */}
       <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
         {indexStatus}
       </div>
       <label className="flex text-stone-400 items-center space-x-2 cursor-pointer">
         <Plus /> <span>Add a file</span>
         {/* <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" /> */}
       </label>

      {/* Display list of files */}
      <ul className="space-y-2 mt-4">
        {files.map((file, index) => (
          <li key={file.name + index} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <File />
              <a href={file.url} target="_blank" rel="noopener noreferrer" title={file.name} className="truncate">
                {file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}
              </a>
            </div>
            <X className="cursor-pointer hover:text-red-500 h-4 w-4" />
          </li>
        ))}
      </ul>
    </div>
  );
}
