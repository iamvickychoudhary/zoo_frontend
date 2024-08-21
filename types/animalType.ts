
export type animalQueryfilter = {
  searchText: {
    name: string
  },
  filters: {
    state: string,
    createdAfter: string,
    createdBefore: string,
  };
  page: number;
  limit: number;
}

// Define the ZooResponse type
export type animalDetails = {
  id: number;
  name: string;
  skills: [];
  age: string;
  createdAt:string,
  state: string;
  favourite_food: string;
  image: {
    image_url: string
  }

}