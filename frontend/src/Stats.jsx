import React, { useEffect, useState } from 'react';

function Stats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Statistics</h1>
      {data ? (
        <ul>
          <li>Visits: {data.visits}</li>
          <li>Users: {data.users}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Stats;