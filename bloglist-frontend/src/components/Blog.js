import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <strong>{blog.title}</strong>{" "}<em>by {blog.author}</em>
  </div>
)

export default Blog