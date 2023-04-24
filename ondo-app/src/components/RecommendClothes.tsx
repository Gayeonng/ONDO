import { useEffect, useState } from 'react';
import FadeIn from './FadeIn';

interface RecommendClothesProps {
  response: string[];
  temperature: number;
}

enum ClothingRecommendation {
  FREEZING = '패딩, 두꺼운 코트, 목도리, 기모제품, 기모 내의, 기모 바지, 누빔 옷, 니트',
  COLD = '코트, 가죽자켓, 히트텍, 스타킹, 기모바지, 레깅스, 기모내의, 털구 슬리퍼, 장갑, 목도리',
  COOL = '자켓, 청자켓, 야상, 셔츠, 니트, 청바지, 면바지, 슬랙스, 스니커즈, 구두',
  MILD = '얇은 가디건, 니트, 맨투맨, 후드집업, 청바지, 면바지, 슬랙스, 스니커즈, 구두',
  WARM = '반팔, 얇은 셔츠, 반바지, 면바지, 원피스, 샌들, 슬리퍼',
}

function getClothingRecommendation(temperature: number | null): string[] {
  if (temperature === null) {
    return [];
  } else if (temperature <= -5) {
    return ClothingRecommendation.FREEZING.split(', ');
  } else if (temperature <= 5) {
    return ClothingRecommendation.COLD.split(', ');
  } else if (temperature <= 15) {
    return ClothingRecommendation.COOL.split(', ');
  } else if (temperature <= 20) {
    return ClothingRecommendation.MILD.split(', ');
  } else {
    return ClothingRecommendation.WARM.split(', ');
  }
}

export default function RecommendClothing({ temperature }: RecommendClothesProps) {
  const [recommendation, setRecommendation] = useState<string[]>([]);

  useEffect(() => {
    setRecommendation(getClothingRecommendation(temperature));
  }, [temperature]);

  const randomRecommendations = recommendation
    .sort(() => Math.random() - 0.5) // 배열을 랜덤하게 섞기
    .slice(0, 3); // 3개만 추천하기

  return (
    <section>
      {randomRecommendations.length > 0 ? (
        <>
          <ul className='flex flex-wrap gap-6'>
            {randomRecommendations?.map((item, index) => {
              return (
                <FadeIn delay={index * 300} key={index}>
                  <li>{item}</li>
                </FadeIn>
              );
            })}
          </ul>
          <div className='mt-8 mb-4 font-semibold text-center'>
            추천 옷차림은 기온에 따라 다를 수 있습니다!
          </div>
        </>
      ) : (
        <div>추천 옷차림 정보가 없습니다.</div>
      )}
    </section>
  );
}