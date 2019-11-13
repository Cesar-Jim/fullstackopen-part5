import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  username,
  password
}) => {
  return (
    <div>
      <h2>Credentials</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username.input} />
        </div>
        <div>
          password
          <input {...password.input} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm;