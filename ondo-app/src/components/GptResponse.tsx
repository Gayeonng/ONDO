interface GptResponseProps {
  response: string | string[];
}

export default function GptResponse({ response }: GptResponseProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">추천 옷차림:</h2>
      <p>{response}</p>
    </div>
  );
}