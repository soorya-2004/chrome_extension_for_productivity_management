import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5002/history").then((res) => {
      setHistory(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Productivity Tracker Dashboard</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>URL</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx}>
              <td>{item.url}</td>
              <td>{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
