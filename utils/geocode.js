import axios from 'axios';

export const geocode = (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGVlcGFrNDM1IiwiYSI6ImNsMTA1MHlkcjI5dmUzam5tMWYwYmR5NmsifQ.-pWj7GyBklq84QUO-Py5QA&limit=1`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(({ data }) => {
        if (data.features.length === 0) {
          reject(`unable to find search results`);
        }
        resolve({
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name,
        });
      })
      .catch((err) => {
        reject('Unable to connect to weather service!');
      });
  });
};
