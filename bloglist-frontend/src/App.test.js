import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {

  test('if no user logged, blogs are not rendered', async () => {
    let bloglist;

    const component = render(
      <App />
    );

    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.loginButton'));

    bloglist = component.container.querySelectorAll('.blog');
    expect(bloglist.length).toBe(0);
  });

  test('renders all blogs after a successful login', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    };

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

    const component = render(
      <App />
    );
    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.blog'));
    const bloglist = component.container.querySelectorAll('.blog');

    expect(bloglist.length).toBe(3);

    expect(component.container).toHaveTextContent(
      'Star Wars: a new hope'
    )
  })
})