import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, user, setBlogs }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibility = { display: blogInfoVisible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = async () => {

    const updatedObject = {
      id: blog.id,
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogService.update(blog.id, updatedObject);
    setLikes(likes + 1);
  }

  const deleteBlog = async (id) => {
    if (window.confirm(`Delete forever the blog: "${blog.title}"?`)) {
      await blogService.deleteBlog(id);
      blogService.getAll().then(blogs => setBlogs(blogs));
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong onClick={() => setBlogInfoVisible(!blogInfoVisible)}>{blog.title}</strong>{" "}<em>by {blog.author}</em>
        <div style={toggleVisibility}>
          <p>url: <a href={blog.url}>{blog.url}</a></p>
          <p>{likes} likes <button onClick={addLike}>like</button></p>
          <p>added by: {blog.author}</p>
          {blog.user.username === user.username ? <button onClick={() => deleteBlog(blog.id)}>delete</button> : null}
        </div>
      </div>

    </div>
  )
}

export default Blog