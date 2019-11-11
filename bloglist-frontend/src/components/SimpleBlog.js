import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="simpleBlog-content">
      {blog.title} {blog.author}
    </div>
    <div className="simpleBlog-likes">
      blog has {blog.likes} likes
      <button data-testid="simpleBlog-like-button" onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog