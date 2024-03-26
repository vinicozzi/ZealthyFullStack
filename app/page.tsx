import SupportForm from "@/components/shared/SupportForm";
import Link from 'next/link'; 
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <SupportForm/>
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <Link href="/admin">
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Access Admin
          </Button>
        </Link>
        </div>
    </div>
  );
}
