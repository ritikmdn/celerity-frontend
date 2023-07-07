"use client";

import { useEffect, useRef, useState } from "react";

export default function Sidebar() {

  const [documents, setDocuments] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    // Here you would usually handle the file upload.
    // For the purposes of this example, we're just going to add the file to our list of documents.
    setDocuments([...documents, file]);
  };

  const handleRemove = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  return (
    <div className="relative h-[92.5vh] w-[22.5%] max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-2 sm:shadow-lg">
        <div>
            <input type="file" accept=".pdf" onChange={handleUpload} />
        </div>
        <div>
            <ul>
            {documents.map((document, index) => (
            <li key={index}>
                {document.name}
                <button onClick={() => handleRemove(index)}>X</button>
            </li>
            ))}
            </ul>
        </div>
    </div>
  );
}
