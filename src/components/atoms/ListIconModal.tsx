import React from "react";
import { listIcon } from "@/constants";

interface SuccessModalProps {
  showModal?: boolean;
  title?: string;
  setIcon: (icon: string) => void;
  handleClose?: () => void;
}

const ListIconModal: React.FC<SuccessModalProps> = ({
  showModal = false,
  title = "List Icon",
  setIcon,
  handleClose,
}) => {
  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="success_modal"
      >
        <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full py-5 px-10 max-h-[480px] ">
          <div className="flex items-center justify-between px-2 mb-5">
            <div className="w-16" />
            <div className="flex-1 flex justify-center">
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-light btn-sm" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-4 px-2 max-h-[380px] overflow-y-auto">
            {listIcon.map((icon, index) => (
              <div
                className="flex flex-col mb-5 hover:cursor-pointer"
                key={index}
              >
                <div
                  key={index}
                  className="group flex flex-col items-center justify-center gap-4 bg-gray-100 p-6 rounded-lg relative border-[1px] border-gray-300 hover:bg-gray-300 transition duration-300 ease-in-out"
                  role="button"
                  onClick={() => setIcon("ki-" + icon)}
                >
                  <i
                    className={`ki-outline ki-${icon} text-2xl text-gray-600 hover:scale-110 transition duration-300 ease-in-out`}
                  />

                  {/* <div className="hidden group-hover:flex absolute inset-0 items-center justify-center bg-gray-300 rounded-lg">
                    <button
                      className="bg-blue-500 text-white text-sm px-4 py-1 rounded-md hover:bg-blue-600 hover:shadow-md transition duration-300 ease-in-out"
                      onClick={() => setIcon("ki-" + icon)}
                    >
                      Use
                    </button>
                  </div> */}
                </div>
                <span className="text-gray-700 text-sm text-center mt-2">
                  {icon}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ListIconModal;
