const blogs = [
  {
    title: 'Star Wars: a new hope',
    author: 'George Lucas',
    url: 'www.swanewhope.com',
    likes: 2000,
    user: {
      username: 'jdoe',
      name: 'John Doe',
      id: '5dbb09613c8a660778adadaa'
    },
    id: '5dc0453eabd7cd58184f19df'
  },
  {
    title: 'Star Wars: empire strikes back',
    author: 'George Lucas',
    url: 'www.swempirestrikesback.com',
    likes: 1800,
    user: {
      username: 'cjimenez',
      name: 'Cesar Jimenez',
      id: '5dbb01a78d89685f20a48daa'
    },
    id: '5dc0454cabd7cd58184f19e0'
  },
  {
    title: 'Star Wars: return of the jedi',
    author: 'George Lucas',
    url: 'www.swreturnofthejedi.com',
    likes: 3500,
    user: {
      username: 'cjimenez',
      name: 'Cesar Jimenez',
      id: '5dbb01a78d89685f20a48daa'
    },
    id: '5dc311f1ab596039683ec650'
  },
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll };