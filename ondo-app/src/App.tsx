import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import GptResponse from './components/GptResponse';
import MainContainer from './components/MainContainer';

const queryClient = new QueryClient();

export default function App() {
  const [result, setResult] = useState<string>();
  const [response, setresponse] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [temperature, setTemperature] = useState(0); // temperature 변수를 선언하고 0으로 초기화합니다.

  const handleSubmit = (value: string, temperature: number) => {
    setIsLoading(true);
    setIsError(false);
    setResult(undefined);
    setresponse([]);
    setTemperature(temperature); // temperature 변수에 전달받은 값을 할당합니다.
    fetch(`http://localhost:8000/recommendations?location=${value}&temperature=${temperature}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data && data.recommendations) {
          setResult(data.recommendations.join(', '));
          setresponse(data.recommendations);
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
      <MainContainer
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isError={isError}
        result={result}
        setResult={setResult}
        response={response}
        temperature={temperature} // temperature 변수를 MainContainer 컴포넌트에 전달합니다.
      />
    </QueryClientProvider>
  );
}