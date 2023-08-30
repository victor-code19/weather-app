type GeocodeResponse = {
  center: [number, number];
  place_name: string;
};

type ResolvedGeocode = {
  longitude: number;
  latitude: number;
  location: string;
};

export const geocode = async (address: string): Promise<ResolvedGeocode> => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?limit=2&access_token=${process.env.MAPBOX_API_KEY}&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Unable to fetch data from location service.');
    }

    if (!data.features || data.features.length === 0) {
      throw new Error('Unable to find location. Try again!');
    }

    const geocodeData: GeocodeResponse = data.features[0];

    return {
      longitude: geocodeData.center[0],
      latitude: geocodeData.center[1],
      location: geocodeData.place_name,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
