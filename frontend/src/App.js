import React, { useState, useEffect } from "react";
import axios from "axios";
import Inbox from "./components/Inbox";

const availableDomains = [
  "tempmail.tech",
  "maildrop.cc",
  "fastmail.tech",
  "fakeinbox.net",
  "inboxbear.com"
];

function App() {
  const [email, setEmail] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(availableDomains[0]);

  const generateEmail = async () => {
    const res = await axios.get("/generate", {
      params: { domain: selectedDomain }
    });
    setEmail(res.data.email);
    fetchInbox(res.data.email);
  };

  const fetchInbox = async (address) => {
    const res = await axios.get(`/inbox/${encodeURIComponent(address)}`);
    setInbox(res.data.emails);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (email) fetchInbox(email);
    }, 5000);
    return () => clearInterval(interval);
  }, [email]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📬 Temp Mail</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>Select Domain:</label>
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={{ padding: "0.5rem" }}
        >
          {availableDomains.map((domain, i) => (
            <option key={i} value={domain}>{domain}</option>
          ))}
        </select>
        <button onClick={generateEmail} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
          Generate Temp Email
        </button>
      </div>

      {email && (
        <>
          <h2>Your Email:</h2>
          <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "5px" }}>
            {email}
          </div>

          <h2 style={{ marginTop: "2rem" }}>Inbox:</h2>
          <Inbox inbox={inbox} />
        </>
      )}
    </div>
  );
}

export default App;
