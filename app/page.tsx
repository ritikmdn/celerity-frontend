import Editor from "@/ui/editor";
import Sensechecker from "@/ui/sensecheck";
import Sidebar from "@/ui/sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-row items-start justify-between sm:px-[2%] sm:py-[2%]">
      <Sidebar />
      <Editor />
      <Sensechecker />
    </div>
  );
}
