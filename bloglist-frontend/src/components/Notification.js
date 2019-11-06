import React from 'react';

const Notification = ({ messageType, messageInfo }) => {
  if (messageType === null) {
    return null;
  }

  return <div className={`${messageType}`}>{messageInfo}</div>
}

export default Notification;