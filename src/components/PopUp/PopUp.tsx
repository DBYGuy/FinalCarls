import React from 'react';

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
  const isLevel = typeof content === 'number';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeUp">
      <div className="relative rounded-lg bg-itsc-black border-4 border-linear p-8 text-white max-w-sm w-full text-center">
        {/* Close Button with SVG */}
        <button className="absolute top-[-12px] right-[-12px]" onClick={onClose}>
          <img src="/CLOSE X BUTTON SQUARE.svg" alt="Close" width="36" height="36" />
        </button>

        {/* Main Text */}
        <h1 className="text-2xl font-bold mb-4">{mainText}</h1>

        {/* Content: Image or Level Number */}
        <div className="text-center mb-4 animate-celebratoryFadeIn">
          {isLevel ? (
            <span className="text-[66px] font-omegle bg-gradient-to-r from-text-gold-start via-text-gold-middle to-text-gold-end bg-clip-text text-transparent">
              {content}
            </span>
          ) : (
            <img src={content} alt="Reward" width={100} height={100} />
          )}
        </div>

        {/* Subtitle */}
        {subtitle && <h2 className="text-xl mb-4">{subtitle}</h2>}

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
