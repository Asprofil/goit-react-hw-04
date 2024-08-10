import React from 'react';

const ImageCard = ({ image, onClick }) => {
  const handleClick = () => {
    onClick(image);
  };

  return (
    <div>
      <img 
        src={image.urls.small} 
        alt={image.alt_description} 
        onClick={handleClick} 
        style={{ cursor: 'pointer' }} // Зміна курсору, щоб показати, що зображення клікабельне
      />
    </div>
  );
};

export default ImageCard;
