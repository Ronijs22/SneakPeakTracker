
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[#F5F5F5]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-6xl font-heading text-center mb-12">BLANK PAGE</h1>
        <Card className="p-8">
          <div className="text-center">
            <p className="text-xl text-gray-600">
              This is a blank page template.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
