export default function ErrorDiv({ error }: { error: string }) {
  return (
    <div className="text-xs text-red-500 text-start bg-red-100 border-2 border-red-300 p-2 rounded-lg">
      <p>{error}</p>
    </div>
  );
}
