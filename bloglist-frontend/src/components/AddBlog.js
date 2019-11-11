import React from 'react'
import blogService from '../services/blogs'

const AddBlog = ({
  blogTitle,
  setBlogTitle,
  blogAuthor,
  setBlogAuthor,
  blogUrl,
  setBlogUrl,
  handleBlogAddition,
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
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        id: blogs.length + 1
      };

      await blogService.create(newBlog);
      setBlogs(blogs.concat(newBlog));
      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      setMessageType('success');
      setMessageInfo(`Added blog: "${blogTitle}" by ${blogAuthor}.`);

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
          value={blogTitle}
          onChange={e => handleBlogAddition(e, setBlogTitle)}
        />
        <br />
        <br />
        <label htmlFor='blog-author'>Author: </label>
        <input
          id='blog-author'
          value={blogAuthor}
          onChange={e => handleBlogAddition(e, setBlogAuthor)}
        />
        <br />
        <br />
        <label htmlFor='blog-url'>URL: </label>
        <input
          id='blog-url'
          value={blogUrl}
          onChange={e => handleBlogAddition(e, setBlogUrl)}
        />
        <br />
        <br />
        <button type='submit'>Add Blog</button>
      </form>
    </div>
  )
}

export default AddBlog;