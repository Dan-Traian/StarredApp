import Button from "@/Components/base/Button";

export default function NotFound() {
  return (
  
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-h1 text-gray-700 font-semibold">404</h1>
        <p className="mt-2 text-md text-gray-600">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button href="/">Go home</Button>
          <Button href="#" variant="outline">Contact support</Button>
        </div>
      </div>
    </div>
  );
}


