import { useEffect } from "react";

const Modal = ({ show, message, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const modalStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-500 bg-opacity-50 z-50">
      <div className={`p-4 rounded-lg text-white ${modalStyles[type]} shadow-lg`}>
        <p className="text-lg font-bold">{message}</p>
        <button className="mt-2 px-4 py-1 bg-gray-900 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
