export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-gray-400 mb-6">Page not found</p>
      <a href="/" className="text-emerald-400 hover:underline">
        Go back home
      </a>
    </div>
  );
}