import React from "react";

const Inbox = ({ inbox }) => {
  if (!inbox.length) return <p>No emails yet.</p>;

  return (
    <div>
      {inbox.map((mail, index) => (
        <div key={index} style={{
          background: "#fff",
          padding: "1rem",
          marginBottom: "1rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <strong>{mail.subject}</strong>
          <p>{mail.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Inbox;