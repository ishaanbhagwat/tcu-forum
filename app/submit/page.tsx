import Protected from "@/components/protected";
import SubmitForm from "@/components/submit-form";

export default function SubmitPage() {
  return (
    <Protected>
      <main className="p-4">
        <h1 className="text-xl font-bold mb-4">Submit a Post</h1>
        <SubmitForm />
      </main>
    </Protected>
  );
}