import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { InputCheckbox } from "../atoms";

interface DetailMenuModalProps {
  showModal?: boolean;
  title?: string;
  tabsData?: {
    isRenderAccessibility?: boolean;
    content: Array<any>;
  };
  handleClose?: () => void;
}

const DetailMenuModal: React.FC<DetailMenuModalProps> = ({
  showModal = false,
  title = "View Menu Details",
  tabsData = {
    isRenderAccessibility: false,
    content: [],
  },
  handleClose,
}) => {
  const [content, setContent] = useState(tabsData?.content?.[0]?.value);
  const [activeTab, setActiveTab] = useState(tabsData?.content?.[0]?.label);
  const [columns, setColumns] = useState([
    { label: "Menu Name", tooltip: "", icon: "" },
  ]);

  useEffect(() => {
    if (tabsData?.isRenderAccessibility) {
      const accessibilityColumns = [
        ...columns,
        { label: "View", tooltip: "", icon: "" },
        { label: "Create", tooltip: "", icon: "" },
        { label: "Update", tooltip: "", icon: "" },
        { label: "Delete", tooltip: "", icon: "" },
        { label: "Approval", tooltip: "", icon: "" },
      ];

      setColumns(accessibilityColumns);
    }
  }, [tabsData?.isRenderAccessibility]);

  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="confirmation_modal"
      >
        <div
          className={`relative bg-white rounded-lg shadow-lg ${
            tabsData?.isRenderAccessibility ? "max-w-[1000px]" : "max-w-[900px]"
          }  w-full py-5 px-10`}
        >
          <div className="flex justify-center items-center p-4 gap-8">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <div className="flex justify-between items-start p-5">
            <div
              className={` ${
                tabsData?.isRenderAccessibility ? "w-1/6" : "w-3/12"
              } `}
            >
              <p className="text-base font-semibold text-gray-800">
                Applications
              </p>
              <ul className="mt-2">
                {tabsData?.content.map((item: any, index: number) => (
                  <li
                    key={index}
                    onClick={() => {
                      setActiveTab(item.label);
                      setContent(
                        tabsData?.content.find((i) => i.label === item.label)
                          ?.value
                      );
                    }}
                    className={`flex items-center mb-2 last:mb-0 text-sm hover:text-blue-500 cursor-pointer hover:font-semibold ${
                      activeTab === item.label
                        ? "text-blue-500 font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`${
                tabsData?.isRenderAccessibility ? "w-5/6" : "w-9/12"
              } `}
            >
              <div
                className={`scrollable-x-auto rounded-lg border max-h-96 overflow-y-auto`}
              >
                <table className="table table-auto" data-datatable-table="true">
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          className={`${
                            index == 0 ? "w-[300px]" : "w-[120px]"
                          } text-center`}
                        >
                          <span className="sort">
                            <span className="sort-label">
                              {column.tooltip ? (
                                <span
                                  className="pt-px"
                                  data-tooltip="true"
                                  data-tooltip-offset="0, 5px"
                                  data-tooltip-placement="top"
                                >
                                  <i className={column.icon} />
                                  <span
                                    className="tooltip max-w-48"
                                    data-tooltip-content="true"
                                  >
                                    {column.tooltip}
                                  </span>
                                </span>
                              ) : (
                                column.label
                              )}
                            </span>
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {content?.length ? (
                      content.map((menu: any, rowIndex: number) => (
                        <tr key={rowIndex} className="">
                          <td className="p-2 flex items-center space-x-4">
                            <div className="flex items-center space-x-4">
                              <div>
                                {activeTab == "SIAP Backoffice" ||
                                activeTab == "SIAP Mobile" ? (
                                  <Image
                                    priority
                                    src="/siap-logo-new.png"
                                    alt="logo"
                                    width={18}
                                    height={18}
                                    className="scale-90"
                                  />
                                ) : (
                                  <Image
                                    priority
                                    src="/siap-payment-new.png"
                                    alt="logo"
                                    width={20}
                                    height={20}
                                    className="scale-150"
                                  />
                                )}
                              </div>
                              <div className="text-left">
                                <p className="font-bold">{menu.label}</p>
                                <p className="font-light">{activeTab}</p>
                              </div>
                            </div>
                          </td>
                          {tabsData?.isRenderAccessibility && (
                            <>
                              {[
                                "View",
                                "Create",
                                "Update",
                                "Delete",
                                "Approval",
                              ].map((action) => (
                                <td key={action} className="p-2 text-center">
                                  <div className="justify-center items-center text-center ml-8">
                                    <InputCheckbox
                                      checked={
                                        Boolean(menu?.[action.toLowerCase()]) ||
                                        undefined
                                      }
                                    />
                                  </div>
                                </td>
                              ))}
                            </>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="flex items-center justify-center p-4 font-semibold"
                          colSpan={7} // Menyesuaikan dengan jumlah kolom total
                        >
                          <p>There is no data found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
