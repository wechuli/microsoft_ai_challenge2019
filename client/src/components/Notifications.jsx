import React, { useState, useEffect } from "react";

const Notifications = props => {
  const { type } = props;
  const [open, changeOpen] = useState(true);
  useEffect(() => {
    changeOpen(true);
  }, []);
  const handleChange = () => {
    changeOpen(!open);
  };
  return (
    <>
      {open ? (
        <div className={`notification ${type}`}>
          <button onClick={handleChange} className="delete"></button>
          {props.children}
        </div>
      ) : null}
    </>
  );
};

export default Notifications;
