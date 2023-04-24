import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainContainer from './components/MainContainer';

const queryClient = new QueryClient();

export default function App() {
  const [result, setResult] = useState<string>();
  const [splitResult, setSplitResult] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (value: string, temperature: number) => {
    setIsLoading(true);
    setIsError(false);
    setResult(undefined);
    setSplitResult([]);
    fetch(`http://localhost:8000/recommendations?location=${value}&temperature=${temperature}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data && data.recommendations) {
          setResult(data.recommendations.join(', '));
          setSplitResult(data.recommendations);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
        console.error(error);
      });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer onSubmit={handleSubmit} isLoading={isLoading} isError={isError} result={result} setResult={setResult} splitResult={splitResult} />
    </QueryClientProvider>
  );
}