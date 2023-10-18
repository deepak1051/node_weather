import axios from 'axios';

export const forcast = (lat, long) => {
  const url = `http://api.weatherstack.com/current?access_key=0dd029bca0e88896dfaf13835a1fa1e3&query=${lat},${long}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        if (data.error) {
          reject(`unable to find location`);
        }
        resolve(
          `temperature is: ${data.current.temperature} degree units. it feels like ${data.current.feelslike} degree units, the weather condition is: ${data.current.weather_descriptions[0]}`
        );
      })
      .catch((err) => {
        reject('Unable to connect to weather service!');
      });
  });
};

//-75.7088,44.1545
