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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-md text-center">
        <p>{text}</p>
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
  );
};

export default ConfirmationModal;
