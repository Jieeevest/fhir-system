import React, { useEffect, useState } from "react";
import InputText from "./InputText";
import DefaultButton from "./Button";
import Select from "./Select";
import Pagination from "./Pagination";
import PaginationData from "../molecules/Pagination";
import debounce from "@/helpers/debounce";
import { useRouter, useSearchParams } from "next/navigation";

// Define types for column and row data
interface Column {
  label: string;
  tooltip?: string;
  icon?: string;
}

interface DataTableProps {
  title?: string;
  className?: string;
  columns: Column[]; // Array of columns with label, tooltip, and optional icon
  data: any;
  filter?: {
    keyword: string;
    status: string;
    pageSize: number;
    page: number;
    totalData: number;
    orderBy: string;
    orderDirection: string;
    startDate: string;
    endDate: string;
  };
  setFilter?: (filter: any) => void;
  pageSizeOptions?: number[];
  filteringField?: Array<any>;
  defaultFilter?: Array<any>;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  className = "",
  columns,
  data,
  filter,
  setFilter,
  pageSizeOptions = [1, 2, 5, 10, 25, 50],
  filteringField = [],
  defaultFilter = [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
    { label: "Inactive", value: "inactive" },
  ],
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [localKeyword, setLocalKeyword] = useState(filter?.keyword || "");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    filteringField?.[0]?.default,
  );
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const debouncedKeyword = debounce(localKeyword, 500);

  useEffect(() => {
    if (debouncedKeyword !== filter?.keyword) {
      setFilter?.({
        ...filter,
        keyword: debouncedKeyword,
        page: 1,
      });
      // Update URL search params
      const params = new URLSearchParams(searchParams.toString());
      params.set("keyword", debouncedKeyword);
      params.set("page", "1");

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    if (searchParams.get("keyword")) {
      setLocalKeyword(searchParams.get("keyword") || "");
    }
  }, [searchParams]);

  return (
    <div className={`relative ${className} `}>
      <div className="grid">
        <div className="card card-grid min-w-full shadow-sm border-[1px] border-gray-300">
          <div className="card-header py-5 flex-wrap shadow-sm border-b-[1px] border-gray-300">
            <h3 className="card-title">{title || "Data Table"}</h3>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <InputText
                  type="text"
                  placeholder="Search"
                  onChange={(e) =>
                    // setFilter && setFilter({ ...filter, keyword: e.target.value })
                    setLocalKeyword(e.target.value)
                  }
                  value={localKeyword || ""}
                />
                <Select
                  className="w-40"
                  onChange={(e) =>
                    setFilter &&
                    setFilter({ ...filter, status: e.target.value })
                  }
                  value={filter?.status || ""}
                  defaultPlaceHolder="Select Status"
                  // disabledPlaceHolder={true}
                  optionValue={defaultFilter || []}
                />
                <DefaultButton
                  type="pill"
                  appearance="primary"
                  text="Filter"
                  icon="ki-filter"
                  onClick={() => setShowFilter(!showFilter)}
                />
              </div>
              {showFilter && (
                <div className="absolute z-50 flex flex-col gap-1 border-[1px] border-gray-300 mt-12 rounded-md shadow-lg p-3 right-5 w-[300px] bg-white">
                  <div className="flex flex-col gap-2 text-center">
                    {filteringField.map((field, index) =>
                      field.type === "select" ? (
                        <div
                          className="flex flex-wrap"
                          key={field.label + index}
                        >
                          <label
                            className="text-xs font-semibold mb-1"
                            key={index}
                          >
                            {field.label}
                          </label>
                          <Select
                            className="w-[300px]"
                            value={selectedValue}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              setSelectedValue(newValue);
                            }}
                            optionValue={field.options || []}
                          />
                        </div>
                      ) : (
                        <div
                          className="flex flex-wrap"
                          key={field.label + index}
                        >
                          <label
                            className="text-xs font-semibold mb-1"
                            key={index}
                          >
                            {field.label}
                          </label>
                          <InputText
                            key={field.label + index}
                            type="text"
                            required={true}
                            placeholder={field.label}
                            className="w-[300px]"
                            value={field.defaultValue}
                            onChange={() => {}}
                          />
                        </div>
                      ),
                    )}
                    <div className="flex justify-between gap-2">
                      <div className="flex flex-wrap">
                        <label className="text-xs font-semibold mb-1">
                          Start Date
                        </label>
                        <InputText
                          type="date"
                          className="w-[132px]"
                          onChange={(e) =>
                            setFilter &&
                            setFilter({ ...filter, startDate: e.target.value })
                          }
                          value={filter?.startDate || ""}
                        />
                      </div>
                      <div className="flex flex-wrap">
                        <label className="text-xs font-semibold mb-1">
                          End Date
                        </label>
                        <InputText
                          type="date"
                          className="w-[132px]"
                          onChange={(e) =>
                            setFilter &&
                            setFilter({ ...filter, endDate: e.target.value })
                          }
                          value={filter?.endDate || ""}
                        />
                      </div>
                    </div>
                    {/* <DefaultButton
                      className="flex justify-center text-center"
                      type="pill"
                      appearance="primary"
                      text="Submit"
                      icon="ki-filter"
                      onClick={() => {
                        setSelectedFilter((prev) => [...prev, selectedValue]);
                      }}
                    /> */}
                  </div>
                </div>
              )}
              {selectedFilter.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 w-full text-sm">
                  {selectedFilter.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center border-[1px] border-blue-500 text-blue-500 px-3 py-1 rounded-md cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                      <span className="mr-2">{item}</span>
                      <button
                        onClick={() =>
                          setSelectedFilter((prev) =>
                            prev.filter((f) => f !== item),
                          )
                        } // Replace with your remove logic
                        className="text-blue-500 bg-transparent border-0 focus:outline-none text-lg"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card-body">
            <div
              data-datatable="true"
              data-datatable-page-size="5"
              data-datatable-state-save="true"
              id="datatable_1"
            >
              <div className="scrollable-x-auto">
                <table
                  className="table table-auto table-border border-[1px] border-gray-300 shadow-sm"
                  data-datatable-table="true"
                >
                  <thead>
                    <tr>
                      {columns.map((column, index) => (
                        <th key={index} className="w-[185px] text-center">
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
                    {data?.length ? (
                      data.map((row: any, rowIndex: number) => (
                        <tr key={rowIndex}>
                          {columns.map((column, colIndex) => (
                            <td key={colIndex} className="text-center ">
                              {row[column.label] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columns.length}
                          className="text-center font-semibold"
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="card-footer justify-center md:justify-between flex-col md:flex-row gap-3 text-gray-600 text-2sm font-medium shadow-sm border-t-[1px] border-gray-300">
                <div className="flex items-center gap-2">
                  Show
                  <select
                    className="select select-sm w-16"
                    data-datatable-size="true"
                    name="perpage"
                    onChange={(e) =>
                      setFilter &&
                      setFilter({ ...filter, pageSize: e.target.value })
                    }
                    value={filter?.pageSize || pageSizeOptions[0]}
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  per page
                </div>
                <div className="flex items-center gap-4">
                  {/* Pagination */}
                  <PaginationData
                    totalItems={filter?.totalData ? filter.totalData : 5}
                    pageSize={filter?.pageSize ? filter.pageSize : 5}
                    currentPage={filter?.page ? filter.page : 1}
                    setFilter={setFilter ? setFilter : () => {}}
                    pageSizeOptions={pageSizeOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
