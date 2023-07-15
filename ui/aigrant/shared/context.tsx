import { createContext, Dispatch, SetStateAction } from "react";

interface ICompletionContext {
  completion: string;
  setCompletion: Dispatch<SetStateAction<string>>;
}

const CompletionContext = createContext<ICompletionContext | null>(null);

export default CompletionContext;
