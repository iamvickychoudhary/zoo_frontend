// All types for Zoo Data
export type loginResponse = {
  status: string;
  message: string;
};

// Define the type for the zooLocation object
export type ZooLocation = {
  websiteUrl: string;
  houseNo: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  imgUrl: string;
}

// Define the type for the formData object
export type zooForm = {
  name: string;
  animalTags: string[]; // Assuming animalTags is an array of strings
  zooLocation: ZooLocation;
}

// Define the Location type
export type Location = {
  id: number;
  website_url: string;
  img_url: string;
  number: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  ZooId: number;
}

// Define the ZooResponse type
export type zooDetails = {
  id: number;
  name: string;
  animal_tags: [];
  state: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  Locations: Location[];
}
// Define the type for queryFilter
export type queryFilter = {
  filters: {
    name: string;
    state: string;
    createdAfter: string;
    createdBefore: string;
    location: {
      city: string;
      state: string;
      country: string;
    };
  };
  page: number;
  limit: number;
}
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
  state: string;
  favourite_food: string;
  image: {
    image_url: string
  }

}