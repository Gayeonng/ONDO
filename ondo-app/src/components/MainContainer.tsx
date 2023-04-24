import { ChangeEvent, FormEvent, useState } from 'react';
import GptResponse from './GptResponse';
import RecommendClothes from './RecommendClothes';
import { connectGPT } from '../api/connectGPT';
import { useMutation } from 'react-query';
import { ClipLoader } from 'react-spinners';
import DarkModeBtn from './DarkModeBtn';
import FadeIn from './FadeIn';

interface MainContainerProps {
  onSubmit: (value: string, temperature: number) => void;
  isLoading: boolean;
  isError: boolean;
  result?: string;
  setResult: React.Dispatch<React.SetStateAction<string | undefined>>;
  splitResult: string[];
}

export default function MainContainer({
  onSubmit,
  isLoading,
  isError,
  result,
  setResult,
  splitResult,
}: MainContainerProps) {
  const [inputValue, setInputValue] = useState('');
  const [temperature, setTemperature] = useState(0);

  const onTemperatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const temperature = parseInt(e.target.value);
    setTemperature(temperature);
  };

  const { mutate } = useMutation(
    ['gpt', inputValue, temperature.toString()],
    () => connectGPT(inputValue, temperature.toString()),
    {
      onSuccess: (data) => {
        setResult(data);
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="bg-primary dark:bg-primary-dark text-secondary dark:text-secondary-dark p-12 shadow-xl flex flex-col items-center rounded-lg overflow-hidden transition">
        <FadeIn>
          <h1 className="text-4xl font-bold mb-8">기온에 맞는 옷차림 추천</h1>
        </FadeIn>

        <FadeIn delay={200}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="지역을 입력하세요."
              value={inputValue}
              onChange={handleInputChange}
              required
              className="border border-primary dark:border-primary-dark bg-secondary dark:bg-secondary-dark text-secondary dark:text-secondary-dark rounded-md p-2 text-center mb-6"
            />

            <div className="flex justify-between items-center mb-6">
              <label htmlFor="temperature-input">기온:</label>
              <input
                id="temperature-input"
                type="number"
                min={-50}
                max={50}
                value={temperature.toString()}
                onChange={onTemperatureChange}
                className="border border-primary dark:border-primary-dark bg-secondary dark:bg-secondary-dark text-secondary dark:text-secondary-dark rounded-md p-2 text-center"
              />
            </div>

            <button type="submit" className="w-full py-2 px-4 text-white bg-primary hover:bg-primary-dark rounded-md mb-6">
              {isLoading ? <ClipLoader color="#ffffff" loading /> : '추천'}
            </button>
          </form>
        </FadeIn>

        {isLoading && (
          <FadeIn>
            <div className="flex justify-center mb-6">
              <ClipLoader color="#ffffff" loading />
            </div>
          </FadeIn>
        )}

        {isError && (
          <FadeIn>
            <p className='text-red-600'>오류가 발생했습니다. 다시 시도해주세요.</p>
          </FadeIn>)
        }

        {splitResult.length > 0 && (
          <FadeIn>
            <RecommendClothes splitResult={splitResult as string[]} />
          </FadeIn>
        )}

        <FadeIn delay={400}>
          <DarkModeBtn />
        </FadeIn>

      </section>
    </div>
  );
}