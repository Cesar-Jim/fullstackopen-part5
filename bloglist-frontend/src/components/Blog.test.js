import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  let mockHandler;
  const blog = {
    title: 'HTML tags almanac',
    author: 'Cesar Jimenez',
    likes: 12,
    url: 'www.htmlalmanac.com',
    id: 20,
    user: {
      name: 'Cesar Jimenez',
      username: 'cjimenez'
    }
  };

  beforeEach(() => {
    mockHandler = jest.fn();
    let user = {
      name: 'Cesar Jimenez',
      username: 'cjimenez'
    };

    component = render(
      <Blog blog={blog} user={user} />
    );
  });

  test('default blog visibility contains title and author', () => {
    const togglableContent = component.container.querySelector('.togglableContent');
    expect(togglableContent).toHaveStyle('display: none');
  });

  test('clicking the blog\'s title, expands hidden blog info like url, owner and likes', () => {
    const blogTitle = component.getByText('by Cesar Jimenez');
    fireEvent.click(blogTitle);

    const togglableContent = component.container.querySelector('.togglableContent');
    expect(togglableContent).toHaveStyle('');
  })

});