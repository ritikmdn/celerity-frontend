'use client';

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import { Folders, X, PlusSquare, ToyBrick, File, CheckCircle, BoxSelect } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/lib/supabase";
import Image from 'next/image';

type CustomFileObject = {
  name: string;
  url?: string;
}

export default function DisplayBox() {
  const [content, setContent] = useState(null);
  const [files, setFiles] = useState<CustomFileObject[]>([]);
  const [indexStatus, setIndexStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [sidebarState, setSidebarState] = useState<'closed' | 'files' | 'plugins'>('closed');
  const [plugins, setPlugins] = useState<{name: string, checked: boolean}[]>([
    {name: "Our World in Data", checked: false},
    {name: "International Monetary Fund", checked: false}
  ]);

  const handleFileChange = async (e) => {
    const fileList = Array.from(e.target.files);
    const file = fileList[0] as File; // Assuming only one file is selected
    const id = uuidv4();
    const path = `demo/${file.name}`;

    setIndexStatus("Uploading...");

    const { error: uploadError } = await supabase.storage.from('pdf-documents').upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });
    if (uploadError) {
      console.error("Error uploading file: ", uploadError);
      return;
    }

    const { error: dbError } = await supabase.from('pdf-documents').insert([
      { id, user_id: 'd1c9ac1a-7e51-4645-8803-7994658c14b5', uploaded_at: new Date(), filename: file.name, file_url: path }
    ]);
    if (dbError) {
      console.error("Error updating DB record: ", dbError);
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...fileList] as File[]);
    setIndexStatus("Uploaded"); // set status to "Indexed" after the file upload is completed

  };

  const editor = useEditor({
    extensions: TiptapExtensions,
    editable: false,
    autofocus: false,
  });

  // Handle file remove
  const handleFileRemove = async (removeIndex) => {
    const fileToRemove = files[removeIndex];
    setIndexStatus("Deleting...");

    // Construct the path
    const path = `demo/${fileToRemove.name}`;

    // Delete the file from storage
    const { error } = await supabase.storage.from('pdf-documents').remove([path]);

    if (error) {
      console.error("Error deleting file: ", error);
      return;
    }

    // Remove the file from the database
    const { error: dbError } = await supabase
      .from('pdf-documents')
      .delete()
      .match({ file_url: path });

    if (dbError) {
      console.error("Error deleting database record: ", dbError);
      return;
    }

    // Remove the file from the state
    setFiles((prevFiles) => prevFiles.filter((file, index) => index !== removeIndex));
    setIndexStatus("Deleted");
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

  useEffect(() => {
    async function fetchFiles() {
      let { data, error } = await supabase.storage.from('pdf-documents').list('demo/');
      if (error) {
        console.error('Error fetching files: ', error);
        return;
      }
      // Create a new array to hold our custom file objects
      const customFileObjects: CustomFileObject[] = [];
      for (let file of data!) {
        const { data: { publicUrl } } = await supabase.storage.from('pdf-documents').getPublicUrl(file.name);
        if (error) {
          console.error('Error getting public URL: ', error);
          continue;
        }
        // Create a new object that includes all properties of the original file object, plus the url property
        const customFileObject = { ...file, url: publicUrl };
        customFileObjects.push(customFileObject);
      }
      setFiles(customFileObjects);
    }
    fetchFiles();
  }, []);
  

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
            {/* <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" /> */}
          </label>
  
          {/* Display list of files */}
          <ul className="space-y-2 mt-4">
            {files.map((file, index) => (
              <li key={file.name + index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <File className="h-5 w-5" />
                  <span className="whitespace-nowrap">
                    {file.name.length > 25 ? file.name.substring(0, 25) + '...' : file.name}
                  </span>
                </div>
                {/* <X className="cursor-pointer text-gray-400 hover:text-red-500 h-4 w-4" onClick={() => handleFileRemove(index)} /> */}
                <X className="cursor-pointer text-gray-400 hover:text-red-500 h-4 w-4"/>
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
                {/* {plugin.checked ? <CheckCircle className="h-5 w-5" color="black" /> : <BoxSelect className="h-5 w-5" color="gray" />} */}
                <BoxSelect className="h-5 w-5" color="gray" />
                <div className="ml-2" style={{ width: '24px' }}>
                  <Image 
                    src={plugin.name === "Our World in Data" ? "/owid.png" : "/imf.png"} 
                    alt={`${plugin.name} Logo`}
                    height={24}
                    width={24}
                  />
                </div>
                {/* <span className="ml-2 align-middle" style={{ color: plugin.checked ? "black" : "gray" }}> */}
                <span className="ml-2 align-middle" style={{ color: "gray" }}>
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
