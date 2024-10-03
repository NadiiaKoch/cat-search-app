import { Breed } from './breed';

export interface CatImage {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}
