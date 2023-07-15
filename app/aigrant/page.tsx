'use client';

import { useState } from 'react';
import Editor from "@/ui/aigrant/editor";
import Sensechecker from "@/ui/aigrant/sensecheck";
import Sidebar from "@/ui/aigrant/sidebar";
import CompletionContext from '@/ui/aigrant/shared/context';

export default function Page() {
  const [completion, setCompletion] = useState("");

  return (
    <CompletionContext.Provider value={{completion, setCompletion}}>
      <div className="flex flex-col min-h-screen sm:px-[2%] sm:py-[2%]">
        <div className="flex flex-row items-start justify-between mt-4">
          <Sidebar />
          <Editor />
          <Sensechecker />
        </div>
      </div>
    </CompletionContext.Provider>
  );
}
