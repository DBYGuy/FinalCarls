import React from 'react';

type ConfirmationModalProps = {
  text: string;
  onConfirm: () => void; // Function to call on confirmation
  onClose: () => void; // Function to close the modal
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  text,
  onConfirm,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative rounded-[5px] box-border w-[361px] h-[303px] overflow-hidden text-center text-white-gold-itsc font-outfit animate-fadeUp">
        <div className="absolute top-[13.38px] left-[1.38px] bg-itsc-black box-border w-full h-[228px] border-[9.8px] border-solid border-linear">
          <div className="p-4">
            <p className="text-white mb-4">{text}</p>
            <div className="flex justify-around mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={onConfirm}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        </div>
        <button
          className="absolute top-[-0px] right-[-8px] text-white"
          onClick={onClose}
        >
          <img className="h-[28px] w-[28px]" src="/close-button@2x.png" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
