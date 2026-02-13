import React from "react";
import { Button } from ".";
import Image from "next/image";

interface SuccessModalProps {
  showModal?: boolean;
  title?: string;
  message?: string;
  handleClose?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  showModal = false,
  title = "Success",
  message = "Loremp ipsum dolor sit amet consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Nulla faucibus mauris et urna congue rhoncus. Nulla facilisi.",
  handleClose,
}) => {
  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="success_modal"
      >
        <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full py-5 px-10">
          <div className="flex items-center justify-center p-4 ">
            <Image
              src={title == "Error" ? "/image-error.png" : "/image-success.png"}
              alt="logo"
              width={title == "Error" ? 140 : 180}
              height={title == "Error" ? 140 : 200}
            />
          </div>
          <div className="flex items-center justify-center p-4 ">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <div className="mb-10 text-gray-600 text-center">{message}</div>
          <div className="flex justify-center">
            <div className="flex gap-2">
              <button
                className={`btn btn-light`}
                data-modal-dismiss="true"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SuccessModal;
