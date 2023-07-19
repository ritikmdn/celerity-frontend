'use client';

import Editor from "@/ui/editor";
import Sensechecker from "@/ui/sensecheck";
import Sidebar from "@/ui/sidebar";
import Navbar from "@/ui/navbar";
import CompletionContext from '@/ui/shared/context';
import { useState } from 'react';

export default function Page() {
  const [completion, setCompletion] = useState("");

  return (
    <CompletionContext.Provider value={{completion, setCompletion}}>
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-grow overflow-auto">
        <Sidebar />
        <div className="flex flex-row flex-grow items-start justify-center space-x-8 p-8 bg-stone-50 overflow-auto">
          <Editor />
          <Sensechecker />
        </div>
      </div>
    </div>
    </CompletionContext.Provider>
  );
}