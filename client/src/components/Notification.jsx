import React, { useState } from "react";

const Notification = props => {
  const { type, message } = props;
  const [open, changeOpen] = useState(false);
  const handleChange = () => {
    changeOpen(!open);
  };
  return (
    <>
      {open ? (
        <div className={`notification ${type}`}>
          <button onClick={handleChange} className="delete"></button>
          {message}
        </div>
      ) : null}
    </>
  );
};

export default Notification;
