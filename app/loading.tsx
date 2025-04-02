export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 bg-[#1a2234] text-gray-200">
      <div className="w-full max-w-4xl px-4 py-16 text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-400 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-6 text-xl text-gray-300">Loading...</p>
      </div>
    </div>
  );
}
