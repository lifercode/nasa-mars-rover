import { Dayjs } from 'dayjs';

export interface DayjsPlugin extends Dayjs {
  between?: (start: string, end: string) => Dayjs;
}

export interface Rover {
  name: string;
}

export interface Photo {
  id: number;
  img_src: string;
  camera: Camera;
  rover: Rover;
}

export interface Camera {
  name: string;
  full_name: string;
}