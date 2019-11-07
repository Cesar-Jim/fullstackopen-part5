import React from 'react';

const BlogForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h3>Add a new blog</h3>

      <form onSubmit={onSubmit}>
        <input value={value} onChange={handleChange}></input>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm;