import React, { useState, useEffect } from 'react';

const CatImageComponent = () => {
  const [catImage, setCatImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search', {
          headers: {
            'x-api-key': 'YOUR_API_KEY'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCatImage(data[0].url);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatImage();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Random Cat Image</h1>
      {catImage && <img src={catImage} alt="A random cat" />}
    </div>
  );
};

export default CatImageComponent;