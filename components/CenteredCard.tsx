import Link from 'next/link';
import React from 'react';

interface CenteredCardProps {
  imageSrc: string;
  heading: string;
  link: string;
  linkText: string;
}

const CenteredCard: React.FC<CenteredCardProps> = ({
  imageSrc,
  heading,
  link,
  linkText,
}) => {
  return (
    <div className="text-base flex flex-col items-center justify-center p-8 bg-primary rounded-3xl shadow-md mb-3" 
        style={{
            height: "11rem"
        }}
    >
      <img src={imageSrc} alt="Icon" className="w-12 h-12 mb-2" style={{
        width: "2rem",
        height: "2rem"
      }}/>
      <p className="font-semibold mb-2 text-center text-white">{heading}</p>
      <Link href={link} className="mt-2 text-cta hover:underline">
        {linkText}
      </Link>
    </div>
  );
};

export default CenteredCard;
