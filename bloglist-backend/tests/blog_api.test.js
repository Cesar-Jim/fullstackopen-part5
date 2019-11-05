const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/list_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/Blog');
const User = require('../models/User');

const initialBlogList = [
  {
    title: 'This is a test',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

// Initial state: clear the database and create one blog from oneItemBlogsList
beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = initialBlogList.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(blog => blog.save());

  await Promise.all(promiseArray);
});

describe('GET blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogList.length);
    expect(response.body.length).toBe(1);
  });

  test('unique identifier id exists for every blog record', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach(record => expect(record.id).toBeDefined())
  });
});

describe('POST blogs', () => {
  test('a blog can be created and persisted in DB', async () => {
    const dummyBlog = {
      title: 'I am a dummy blog',
      author: 'No name',
      url: 'http://www.nourl.com',
      likes: 0
    };

    await api.post('/api/blogs').send(dummyBlog).expect(200); // status is OK?

    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(initialBlogList.length + 1); // DB items + 1?
    expect(response.body[response.body.length - 1].title).toBe('I am a dummy blog'); // last item's title?
  })

  test('the "likes" property defaults to zero when this property is missing', async () => {
    const dummyBlog = {
      title: 'I didn\'t define likes',
      author: 'No name',
      url: 'http://www.nolikes.com'
    };

    const newestBlog = await api.post('/api/blogs').send(dummyBlog);

    expect(newestBlog.body.likes).toBe(0);
  })

  test('if title and url are missing, a bad request error is returned', async () => {
    const dummyBlog = {
      author: 'John Doe',
      likes: 10
    };

    await api.post('/api/blogs').send(dummyBlog).expect(400);

  })
});

describe('DELETE blogs', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(initialBlogList.length - 1);

    const contents = blogsAtEnd.map(b => b.title);
    expect(contents).not.toContain(blogToDelete.title);
  })
})

describe('PUT (edit) blogs', () => {
  test('A blog can be edited', async () => {
    const editedBlog = {
      title: 'I am an edited blog',
      author: 'This name is edited',
      url: 'http://www.editedblog.com',
      likes: 200
    }

    const blogsBeforeEdition = await helper.blogsInDb();

    await api.put(`/api/blogs/${blogsBeforeEdition[0].id}`).send(editedBlog).expect(200);

    const blogsAfterEdition = await helper.blogsInDb();

    blogsAfterEdition.forEach(blog => {
      expect(blog.title).toEqual('I am an edited blog');
    })
  });
});

// USER RELATED TESTING:
describe('when there is initially one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'secret' });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'cjimenez',
      name: 'Cesar Jimenez',
      password: '1234',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper status code and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: '1234',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('creation fails with proper status if username and/or password are not provided', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Peter Smith',
      password: '1234',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username AND password must be provided')

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  })
});


afterAll(() => {
  mongoose.connection.close();
})