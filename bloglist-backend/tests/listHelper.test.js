const listHelper = require('../utils/list_helper');

const emptyBlogsList = [];
const oneItemBlogsList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const severaltemsBlogsList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

// Test suite for dummy function:
describe('dummy function', () => {
  test('dummy returns one', () => {

    const result = listHelper.dummy(emptyBlogsList);
    expect(result).toBe(1)
  });
});

// Test suite for totalLikes function:
describe('total likes', () => {
  test('of an empty list is zero', () => {

    const result = listHelper.totalLikes(emptyBlogsList);
    expect(result).toBe(0);
  });

  test('of a list containing just one blog, equals the likes of that blog', () => {

    const result = listHelper.totalLikes(oneItemBlogsList);
    expect(result).toBe(5);
  });

  test('of a list containing more than 1 blog is calculated right', () => {

    const result = listHelper.totalLikes(severaltemsBlogsList);
    expect(result).toBe(36);
  });
});

// Test suite for favorite blog
describe('favorite blog', () => {
  test('of a list containing just one blog, equals that same blog ', () => {

    const result = listHelper.favoriteBlog(oneItemBlogsList);
    expect(result).toEqual({ title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 })
  });

  test('of a list containing more than one blog, should return the one that has the most likes (in case of a draw, the last one wins)', () => {

    const result = listHelper.favoriteBlog(severaltemsBlogsList);
    expect(result).toEqual({ title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 });
  });
});

// Test suite for top blogger
describe('top blogger', () => {
  test('of a list containing more than one blog, should return the author that has more blogs', () => {

    const result = listHelper.topBlogger(severaltemsBlogsList);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

// Test suite for most liked blogger
describe('most liked blogger', () => {
  test('of a list containing more than one blog, should return the author that overall has the most likes', () => {

    const result = listHelper.mostLikedBlogger(severaltemsBlogsList);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});

module.exports = { emptyBlogsList, oneItemBlogsList, severaltemsBlogsList }