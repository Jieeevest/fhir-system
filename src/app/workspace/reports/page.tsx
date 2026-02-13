"use client";
import React, { Fragment } from "react";

// Mock reports data
const reportsData = [
  {
    id: 1,
    reportName: "Patient Summary Report",
    patient: {
      name: "Budi Santoso",
      id: "2024-001234",
    },
    type: "Summary",
    dueDate: "Monthly",
  },
  {
    id: 2,
    reportName: "Diagnosis Statistics",
    patient: {
      name: "Siti Aminah",
      id: "2024-001567",
    },
    type: "Analytics",
    dueDate: "Quarterly",
  },
  {
    id: 3,
    reportName: "Medication Prescriptions",
    patient: {
      name: "Ahmad Fauzi",
      id: "2024-002341",
    },
    type: "Clinical",
    dueDate: "Monthly",
  },
  {
    id: 4,
    reportName: "Additional File 1",
    patient: {
      name: "Dewi Lestari",
      id: "2024-003456",
    },
    type: "Additional",
    dueDate: "Monthly",
  },
  {
    id: 5,
    reportName: "Additional File 2",
    patient: {
      name: "Eko Prasetyo",
      id: "2024-004567",
    },
    type: "Additional",
    dueDate: "Monthlys",
  },
];

export default function ReportsPage() {
  const handleDownload = (reportName: string) => {
    // Mock download functionality
    console.log(`Downloading ${reportName}...`);
    alert(`Downloading ${reportName}...`);
  };

  return (
    <Fragment>
      <div className="pb-10 overflow-auto -mt-5">
        {/* Header Section */}
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="hover:text-gray-700">FHIR Health</span>
            <i className="ki-outline ki-right text-xs mx-2"></i>
            <span className="hover:text-gray-700">Master Data</span>
            <i className="ki-outline ki-right text-xs mx-2"></i>
            <span className="text-gray-800 font-medium">Reports</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Manage Report Data
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
          {/* Reports Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Available Reports
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportsData.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {report.reportName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
                              {report.patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {report.patient.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {report.patient.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {report.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {report.dueDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDownload(report.reportName)}
                          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
