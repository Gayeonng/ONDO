import axios from 'axios';

interface GptResponse {
  text: string;
  temperature: number;
}

export async function connectGPT(inputValue: string, location: string): Promise<string> {
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${WEATHER_API_KEY}`;

  try {
    // Get weather data
    const weatherResponse = await axios.get(WEATHER_API_URL);
    const temperatureKelvin = weatherResponse.data.main.temp;
    const temperatureCelsius = Math.round(temperatureKelvin - 273.15);
    const temperature = `${temperatureCelsius}°C`;

    // Get color recommendations from GPT-3
    const response = await axios.post<GptResponse>(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        prompt: `${inputValue}의 날씨 정보 출력하고 기온에 맞는 옷차림을 예시와 같은 형식으로 추천해줘. 그리고 답변 맨앞 콤마는 제거해줘. 예시) 오늘은 기온이 4도로 날씨가 춥네요. 패딩, 목도리, 또는 기모가 들어간 옷을 입고 따뜻하게 하루를 보내세요!`,
        temperature: 0,
        max_tokens: 100,
        stop: '\n',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const { text } = response.data;
    const data = text.trim().replace(/^,/, '');

    return `오늘 ${location} 날씨는 ${temperature} 입니다. ${inputValue}의 기온에 맞는 옷차림은 ${data} 입니다.`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}