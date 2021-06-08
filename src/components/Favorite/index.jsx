import React from 'react';

const Favorite = (data) => {
  return (
    <div className="favorite">
      {data.title}
      {data.description}
    </div>
  );
};

export default Favorite;
