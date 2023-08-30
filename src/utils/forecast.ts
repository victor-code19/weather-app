type CurrentWeather = {
  weather_descriptions: string;
  temperature: number;
  feelslike: number;
};

export const forecast = async (latitude: number, longitude: number): Promise<string> => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${latitude},${longitude}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Unable to fetch data from forecast service.');
    }

    const data = await response.json();

    if (data.error) {
      throw new Error('Unable to find location, try again!');
    }

    const weatherInfo: CurrentWeather = data.current;

    const { weather_descriptions, temperature, feelslike } = weatherInfo;

    return `It is currently ${weather_descriptions}. There is ${temperature} degrees out and it feels like ${feelslike}.`;
  } catch (error) {
    throw new Error(error.message);
  }
};
