import React from "react";
import { Tabs } from "../atoms";

interface DetailMenuModalProps {
  showModal?: boolean;
  title?: string;
  tabsData?: Array<any>;
  handleClose?: () => void;
}

const DetailMenuModal: React.FC<DetailMenuModalProps> = ({
  showModal = false,
  title = "View Menu Details",
  tabsData = [],
  handleClose,
}) => {
  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="confirmation_modal"
      >
        <div className="relative bg-white rounded-lg shadow-lg max-w-[600px] w-full py-5 px-10">
          <div className="flex justify-center items-center p-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <Tabs tabs={tabsData} />
          <div className="flex justify-center">
            <div className="flex gap-2">
              <button
                className="btn btn-light"
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

export default DetailMenuModal;
