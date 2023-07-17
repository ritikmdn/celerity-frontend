'use client';

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import { Folders, X, PlusSquare, ToyBrick, File, CheckCircle, BoxSelect } from "lucide-react";

export default function DisplayBox() {
  const [content, setContent] = useState(null);
  const [files, setFiles] = useState<File[]>([]);
  const [indexStatus, setIndexStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [sidebarState, setSidebarState] = useState<'closed' | 'files' | 'plugins'>('closed');
  const [plugins, setPlugins] = useState<{name: string, checked: boolean}[]>([
    {name: "Our world in data", checked: false},
    {name: "IMF", checked: false}
  ]);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editable: false,
    autofocus: false,
  });

  // Handle file input change
  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...fileList] as File[]);
  };

  // Handle file remove
  const handleFileRemove = (removeIndex) => {
    setFiles((prevFiles) => prevFiles.filter((file, index) => index !== removeIndex));
  };

  // Handle checkbox click
  const handleCheckboxClick = (index: number) => {
    setPlugins(prevPlugins => {
      const newPlugins = [...prevPlugins];
      newPlugins[index].checked = !newPlugins[index].checked;
      return newPlugins;
    });
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
    <div className="sticky top-0 left-0 h-[100%] w-auto bg-white border-r border-gray-200 p-4 flex">
      {/* Icons */}
      <div className="flex flex-col space-y-6 items-center">
        <button onClick={() => setSidebarState(sidebarState === 'files' ? 'closed' : 'files')}>
          <Folders className="h-6 w-6" color={sidebarState === 'files' ? 'red' : 'gray'} />
        </button>
        <button onClick={() => setSidebarState(sidebarState === 'plugins' ? 'closed' : 'plugins')}>
          <ToyBrick className="h-6 w-6" color={sidebarState === 'plugins' ? 'red' : 'gray'} />
        </button>
      </div>
  
      {/* Sidebar Contents */}
      {sidebarState === 'files' && (
        <div className="ml-8 mr-4 px-2">
          <h2 className="text-lg font-semibold mb-2 whitespace-nowrap">Internal data</h2> {/* Added heading */}
          {/* Add a file button */}
          <div className="w-min mb-4 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
            {indexStatus}
          </div>
          <label className="flex text-stone-400 items-left space-x-2 cursor-pointer text-sm">
            <PlusSquare className="h-4 w-4" /> <span className="whitespace-nowrap">Add a file</span>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          </label>
  
          {/* Display list of files */}
          <ul className="space-y-2 mt-40">
            {files.map((file, index) => (
              <li key={file.name + index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <File className="h-5 w-5" />
                  <span title={file.name} className="whitespace-nowrap">
                    {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                  </span>
                </div>
                <X className="cursor-pointer text-gray-400 hover:text-red-500 h-4 w-4" onClick={() => handleFileRemove(index)} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {sidebarState === 'plugins' && (
        <div className="ml-8 mr-4 px-2">
          <h2 className="text-lg font-semibold mb-2">External plugins</h2> {/* Added heading */}
          <ul className="space-y-2 mt-4">
            {plugins.map((plugin, index) => (
              <li key={plugin.name} className="flex whitespace-nowrap items-left  cursor-pointer" onClick={() => handleCheckboxClick(index)}>
                {plugin.checked ? <CheckCircle className="h-5 w-5" color="black" /> : <BoxSelect className="h-5 w-5" color="grey" />}
                <span className="ml-2 align-middle" style={{ color: plugin.checked ? "black" : "grey" }}>
                  {plugin.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );  
}
