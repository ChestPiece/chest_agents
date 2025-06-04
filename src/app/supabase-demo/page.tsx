import SupabaseAuthExample from "@/components/supabase-auth-example";
import SupabaseDataExample from "@/components/supabase-data-example";
import { Navbar1 } from "@/components/ui/navbar-1";

export default function SupabaseDemoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Supabase Integration Demo
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <SupabaseAuthExample />
          </div>
          <div>
            <SupabaseDataExample />
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Setup Instructions</h2>
          <p className="mb-2">
            To use this demo, you need to set up your Supabase project and
            configure environment variables:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Create a Supabase project at{" "}
              <a
                href="https://supabase.com"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                supabase.com
              </a>
            </li>
            <li>
              Create a{" "}
              <code className="bg-gray-100 px-1 rounded">.env.local</code> file
              in the project root with your Supabase credentials
            </li>
            <li>
              Create a <code className="bg-gray-100 px-1 rounded">tasks</code>{" "}
              table in your Supabase database
            </li>
            <li>Enable email authentication in your Supabase Auth settings</li>
          </ol>
          <p className="mt-4">
            For more detailed instructions, see the{" "}
            <code className="bg-gray-100 px-1 rounded">
              docs/supabase-setup.md
            </code>{" "}
            file.
          </p>
        </div>
      </div>
    </div>
  );
}
