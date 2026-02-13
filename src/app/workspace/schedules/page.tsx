"use client";
import React, { Fragment } from "react";

// Mock schedules data
const schedulesData = [
  {
    id: 1,
    time: "08:00 - 08:30",
    patient: {
      name: "Budi Santoso",
      id: "2024-001234",
    },
    type: "Follow Up",
    location: "Poli Penyakit Dalam",
    status: "Completed",
  },
  {
    id: 2,
    time: "09:00 - 09:30",
    patient: {
      name: "Siti Aminah",
      id: "2024-001567",
    },
    type: "Consultation",
    location: "Poli Penyakit Dalam",
    status: "Completed",
  },
  {
    id: 3,
    time: "10:00 - 10:30",
    patient: {
      name: "Ahmad Fauzi",
      id: "2024-002341",
    },
    type: "Emergency",
    location: "Emergency Room",
    status: "Completed",
  },
  {
    id: 4,
    time: "11:00 - 11:30",
    patient: {
      name: "Dewi Lestari",
      id: "2024-003456",
    },
    type: "Follow Up",
    location: "Poli Penyakit Dalam",
    status: "In Progress",
  },
  {
    id: 5,
    time: "13:00 - 14:00",
    patient: {
      name: "Eko Prasetyo",
      id: "2024-004567",
    },
    type: "Follow Up",
    location: "Poli Penyakit Dalam",
    status: "Scheduled",
  },
];

export default function SchedulesPage() {
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
            <span className="text-gray-800 font-medium">Schedules</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-800">Schedules</h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Manage Schedules Data
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
          {/* Schedules Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
            {/* Date Header */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800">
                Today, 13th Feb 2026
              </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                <thead className="bg-gray-50 rounded-lg">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedulesData.map((schedule) => (
                    <tr key={schedule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {schedule.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
                              {schedule.patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {schedule.patient.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {schedule.patient.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {schedule.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {schedule.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={schedule.status} />
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

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Scheduled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
}
