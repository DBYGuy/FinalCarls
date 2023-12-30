import React from 'react';
import Image from 'next/image';

type PopUpProps = {
  mainText: string;
  subtitle?: string;
  content: string | number; // Image URL or number
  onClose: () => void; // Function to close the popup
};

const PopUp: React.FC<PopUpProps> = ({
  mainText,
  subtitle,
  content,
  onClose,
}) => {
  // Determine if the content is a level number (number) or an image (string)
  const isLevel = typeof content === 'number';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative rounded-lg bg-itsc-black border-4 border-linear p-8 text-white max-w-sm w-full">
        {/* Close Button */}
        <button className="absolute top-2 right-2 text-white" onClick={onClose}>
          x
        </button>

        {/* Main Text */}
        <h1 className="text-2xl font-bold mb-4">{mainText}</h1>

        {/* Subtitle */}
        {subtitle && <h2 className="text-xl mb-4">{subtitle}</h2>}

        {/* Content: Image or Level Number */}
        <div className="text-center mb-4">
          {isLevel ? (
            <span className="text-6xl font-omegle">{content}</span>
          ) : (
            <Image src={content} alt="Reward" width={100} height={100} />
          )}
        </div>

        {/* Close Button */}
        <button
          className="rounded-lg bg-gradient-to-r from-[#fbd099] to-[#ffe299] px-6 py-2 text-black font-bold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
