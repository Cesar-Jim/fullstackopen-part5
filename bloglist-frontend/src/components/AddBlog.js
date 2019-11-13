import React from 'react'
import blogService from '../services/blogs'

const AddBlog = ({
  title,
  author,
  url,
  blogs,
  setBlogs,
  setMessageType,
  setMessageInfo,
  user,
}) => {

  const addBlog = async e => {
    e.preventDefault();

    try {
      const newBlog = {
        user,
        title: title.input.value,
        author: author.input.value,
        url: url.input.value,
        id: blogs.length + 1
      };

      await blogService.create(newBlog);
      setBlogs(blogs.concat(newBlog));
      title.reset();
      author.reset();
      url.reset();
      setMessageType('success');
      setMessageInfo(`Added blog: "${title.input.value}" by ${author.input.value}.`);

      setTimeout(() => {
        setMessageType(null);
        setMessageInfo(null);
      }, 5000);

    } catch (exception) {
      setMessageType('error');
      setMessageInfo('An error has ocurred during blog creation...');
      setTimeout(() => {
        setMessageType(null);
        setMessageInfo(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h3>Add a new blog:</h3>
      <form onSubmit={addBlog}>
        <label htmlFor='blog-title'>Title: </label>
        <input
          id='blog-title'
          {...title.input}
        />
        <br />
        <br />
        <label htmlFor='blog-author'>Author: </label>
        <input
          id='blog-author'
          {...author.input}
        />
        <br />
        <br />
        <label htmlFor='blog-url'>URL: </label>
        <input
          id='blog-url'
          {...url.input}
        />
        <br />
        <br />
        <button type='submit'>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog;