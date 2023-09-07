import React from 'react';

interface PronoBtnProps {
  size: number;
}

const PronoBtn: React.FC<PronoBtnProps> = ({ size }) => {
  if(size == 0){
      size = 22.125
  }
  const buttonStyle = {
    background: "#48beb9",
    width: `${size}rem`,
    height: `${size / 4.5}rem`, // Adjust height based on the size prop (assuming height is 1/4 of the width)
  };

  return (
    <div className="flex justify-center items-center relative">
      <button className="text-white py-4 px-7 rounded-lg font-serif" style={buttonStyle}>
        Je valide mes pronos
      </button>
    </div>
  );
};

export default PronoBtn;
