import { Category, Post } from './feedSlice';

export const PROFILE_IMAGE_OLIVER_MICKE = process.env.PUBLIC_URL + '/img/oliver-micke.jpg';
export const PROFILE_IMAGE_EMILY_ROSE28 =
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60';

// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates/9035732#9035732
const generateRandomDate = (start = new Date(Date.now() - 100000000), end = new Date()): number =>
  +new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const MOCKED_POSTS: { [postID in Post['postID']]: Post } = {
  1: {
    categories: ['news'] as Category[],
    date: generateRandomDate(),
    postID: 1,
    rating: 23,
    text: 'Lorem ipsum dolor sit amet.',
    title: 'VCU Developed CODVID-19 test',
    username: 'olivermicke',
    imageURL:
      'https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
  2: {
    categories: ['grocery'] as Category[],
    date: generateRandomDate(),
    postID: 2,
    rating: 72,
    text:
      'We will have a limited supply of toilet paper at Target on Broad street for the next days – source: I work there.',
    title: 'Limited supply of toilet paper at Target on Broad street',
    username: 'emily_rose28',
    imageURL:
      'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_EMILY_ROSE28,
  },
  3: {
    categories: ['news', 'medical_supply'] as Category[],
    date: generateRandomDate(),
    postID: 3,
    rating: 74,
    text:
      'Found some N95 masks available in the home depot in Henrico. I saw at least 3 boxes when I was there at around 9:30 AM',
    title: 'N95 masks available again in Home Depot in Henrico',
    username: 'olivermicke',
    imageURL:
      'https://images.unsplash.com/photo-1584462198614-03c2a523945d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
  4: {
    categories: ['advice'] as Category[],
    date: generateRandomDate(),
    postID: 4,
    rating: 44,
    text: "Especially in areas with community-spread, it's recommended to wear face masks whenever possible.",
    title: 'CDC recommends to wear face masks',
    username: 'olivermicke',
    imageURL:
      'https://images.unsplash.com/photo-1582795003154-35736cf26353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
  5: {
    categories: ['news', 'grocery'] as Category[],
    date: generateRandomDate(),
    postID: 5,
    rating: 54,
    text:
      'A friend of mine just told me that toilet paper production was ramped up to keep up with the incresed demand.',
    title: 'Toilet paper production ramping up',
    username: 'olivermicke',
    imageURL:
      'https://images.unsplash.com/photo-1583541988180-fdf816b632e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_OLIVER_MICKE,
  },
  6: {
    categories: ['news'] as Category[],
    date: generateRandomDate(),
    postID: 6,
    rating: 84,
    text: 'Service disconnection has just been suspended!',
    title: 'Service disconnection has been suspended',
    username: 'emily_rose28',
    imageURL:
      'https://images.unsplash.com/uploads/141086319550951a179e1/a07e0918?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
    userImageURL: PROFILE_IMAGE_EMILY_ROSE28,
  },
};

export const MOCKED_CATEGORIES: { [category in Category]: { [postID in Post['postID']]: Post } } = {
  news: {
    1: MOCKED_POSTS[1],
    3: MOCKED_POSTS[3],
    5: MOCKED_POSTS[5],
    6: MOCKED_POSTS[6],
  },
  medical_supply: {
    3: MOCKED_POSTS[3],
  },
  grocery: {
    2: MOCKED_POSTS[2],
    5: MOCKED_POSTS[5],
  },
  advice: {
    4: MOCKED_POSTS[4],
  },
};
