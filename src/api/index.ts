import getRandomDate from '../utils/getRandomDate';
import { Photo } from '../types';

const { VITE_API_URL, VITE_API_KEY } = import.meta.env

export async function fetchRoverInfo() {
  const url = `${VITE_API_URL}?api_key=${VITE_API_KEY}`;
  const { rover } = await fetch(url).then((res) => res.json());
  const earth_date = getRandomDate(rover.landing_date, rover.max_date);
  return { earth_date };
}

export async function fetchRoverPhotos(earth_date: string | undefined): Promise<Photo[]> {
  const url = `${VITE_API_URL}/photos?earth_date=${earth_date}&page=1&api_key=${VITE_API_KEY}`;
  const { photos } = await fetch(url).then((res) => res.json());
  const limitedPhotos = photos.slice(0, 6);
  return limitedPhotos;
}
