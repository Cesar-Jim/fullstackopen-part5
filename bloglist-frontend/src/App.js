import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login';
import AddBlog from './components/AddBlog';
import './App.css';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [messageType, setMessageType] = useState(null);
  const [messageInfo, setMessageInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const rows = () => blogs.sort((blogA, blogB) => blogB.likes - blogA.likes).map(blog => (
    <Blog
      key={blog.id}
      blog={blog}
      setBlogs={setBlogs}
      user={user}
    />
  ));

  const handleBlogAddition = (e, setter) => {
    setter(e.target.value);
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' };
    const showWhenVisible = { display: loginVisible ? '' : 'none' };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>login</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }


  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

      setMessageType('success');
      setMessageInfo(`Welcome ${user.name}!`);

      setTimeout(() => {
        setMessageType(null);
        setMessageInfo(null);
      }, 5000);

    } catch (exception) {
      setMessageType('error');
      setMessageInfo('Wrong login credentials');
      setTimeout(() => {
        setMessageType(null);
        setMessageInfo(null);
      }, 5000);
    }
  };

  const handleLogout = e => {
    e.preventDefault();
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  }

  return (
    <div>
      <h1>Bloglist</h1>

      <Notification messageType={messageType} messageInfo={messageInfo} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in {" "} <button onClick={(e) => handleLogout(e)}>logout</button></p>
          <h2>Blogs:</h2>
          <ul>{rows()}</ul>
          <br />
          <Togglable buttonLabel='new blog'>
            <AddBlog
              blogTitle={blogTitle}
              setBlogTitle={setBlogTitle}
              blogAuthor={blogAuthor}
              setBlogAuthor={setBlogAuthor}
              blogUrl={blogUrl}
              setBlogUrl={setBlogUrl}
              setBlogs={setBlogs}
              handleBlogAddition={handleBlogAddition}
              setMessageType={setMessageType}
              setMessageInfo={setMessageInfo}
              blogs={blogs}
              user={user}
            />
          </Togglable>
        </div>
      }

      <div>
      </div>
    </div>
  )
}

export default App;
