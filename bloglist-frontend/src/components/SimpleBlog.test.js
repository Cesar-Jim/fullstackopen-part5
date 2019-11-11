import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {
  let component;
  let mockHandler;
  const blog = {
    title: "React is a cool framework",
    author: "Cesar Jimenez",
    likes: 25
  }

  beforeEach(() => {
    mockHandler = jest.fn();
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );
  });

  test('renders the blog\'s title and author', () => {
    const blogTitle = component.getByText('React is a cool framework Cesar Jimenez');
    expect(blogTitle).toHaveTextContent('React is a cool framework');
  });

  test('renders the blog\'s likes', () => {
    const blogLikes = component.getByText('blog has 25 likes');
    expect(blogLikes).toHaveTextContent('blog has 25 likes');
  });

  test('clicking the button twice, calls event handler twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls.length).toBe(2);
  })

})