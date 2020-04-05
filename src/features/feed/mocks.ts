import { Category, Post } from './feedSlice';

const PROFILE_IMAGE_OLIVER_MICKE = process.env.PUBLIC_URL + '/img/oliver-micke.jpg';
const PROFILE_IMAGE_EMILY_ROSE =
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';

// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates/9035732#9035732
const generateRandomDate = (start = new Date(Date.now() - 100000000), end = new Date()): number =>
  +new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const MOCKED_POSTS: { [postID in Post['postID']]: Post } = {
  1: {
    categories: ['news'] as Category[],
    date: generateRandomDate(),
    postID: 1,
    rating: 84,
    text:
      'Service disconnection has been suspended. Lorem ipsum dolor sit amet. Amet sit dolor ipsum lorem? Lorem ipsum dolor sit amet!',
    title: 'Service disconnection has been suspended',
    username: 'emily_rose28',
    imageURL:
      'https://d1icd6shlvmxi6.cloudfront.net/gsc/X9IVK7/3c/bd/d1/3cbdd1179713474eabfb78be3cf8629b/images/home_screen/rectangle_u40.svg?token=f23c8c9de4fa5bfa0831193450eb20706a9de08b17e27baacb18cabb5cc57713',
    userImageURL: PROFILE_IMAGE_EMILY_ROSE,
  },
  2: {
    categories: ['news', 'medical_supply'] as Category[],
    date: generateRandomDate(),
    postID: 2,
    rating: 23,
    text:
      'Found some N95 masks available in the home depot in Henrico. I saw at least 3 boxes when I was there at around 9:30 AM',
    title: 'N95 masks available again in Home Depot in Henrico',
    username: 'olivermicke',
    imageURL:
      'https://d1icd6shlvmxi6.cloudfront.net/gsc/X9IVK7/3c/bd/d1/3cbdd1179713474eabfb78be3cf8629b/images/home_screen/rectangle_u179.svg?token=be03a14c6f0ed738daf690859452a87a150fdecde15c5a477fd7def9bb5fb483',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
  3: {
    categories: ['news'] as Category[],
    date: generateRandomDate(),
    postID: 3,
    rating: 55,
    text: 'Lorem ipsum dolor sit amet.',
    title: 'VCU Developed CODVID-19 test',
    username: 'olivermicke',
    imageURL:
      'https://d1icd6shlvmxi6.cloudfront.net/gsc/X9IVK7/3c/bd/d1/3cbdd1179713474eabfb78be3cf8629b/images/home_screen/rectangle_u82.svg?token=03f8946f6d34850c79b1d05c4aea91b82cc010f882f8813cf39a69c9c3ab2b26',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
  4: {
    categories: ['grocery'] as Category[],
    date: generateRandomDate(),
    postID: 4,
    rating: 72,
    text:
      'We will have a limited supply of toilet paper at Target on Broad street for the next days – source: I work there.',
    title: 'Limited supply of toilet paper at Target on Broad street',
    username: 'emily_rose',
    imageURL:
      'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_EMILY_ROSE,
  },
  5: {
    categories: ['advice'] as Category[],
    date: generateRandomDate(),
    postID: 5,
    rating: 44,
    text: "Especially in areas with community-spread, it's recommended to wear face masks whenever possible.",
    title: 'CDC recommends to wear face masks',
    username: 'olivermicke',
    imageURL:
      'https://images.unsplash.com/photo-1582795003154-35736cf26353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
  6: {
    categories: ['news', 'grocery'] as Category[],
    date: generateRandomDate(),
    postID: 6,
    rating: 19,
    text:
      'A friend of mine just told me that toilet paper production was ramped up to keep up with the incresed demand.',
    title: 'Toilet paper production ramping up',
    username: 'olivermicke',
    imageURL:
      'https://d1icd6shlvmxi6.cloudfront.net/gsc/X9IVK7/3c/bd/d1/3cbdd1179713474eabfb78be3cf8629b/images/home_screen/rectangle_u66.svg?token=96914e934d88a61faaecb0930cbabccb579d79c0ed63c8b00eabe4b0e4f98b4b',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
};

export const MOCKED_CATEGORIES: { [category in Category]: { [postID in Post['postID']]: Post } } = {
  news: {
    1: MOCKED_POSTS[1],
    2: MOCKED_POSTS[2],
    3: MOCKED_POSTS[3],
    6: MOCKED_POSTS[6],
  },
  medical_supply: {
    2: MOCKED_POSTS[2],
  },
  grocery: {
    4: MOCKED_POSTS[4],
    6: MOCKED_POSTS[6],
  },
  advice: {
    5: MOCKED_POSTS[5],
  },
};
