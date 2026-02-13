"use client";
import React, { Fragment } from "react";

// Mock tasks data
const tasksData = [
  {
    id: 1,
    task: "Review Lab Results",
    patient: {
      name: "Budi Santoso",
      id: "2024-001234",
    },
    priority: "High",
    dueDate: "Today",
    status: "Completed",
  },
  {
    id: 2,
    task: "Sign Prescription",
    patient: {
      name: "Siti Aminah",
      id: "2024-001567",
    },
    priority: "High",
    dueDate: "Today",
    status: "Completed",
  },
  {
    id: 3,
    task: "Update Medical Record",
    patient: {
      name: "Ahmad Fauzi",
      id: "2024-002341",
    },
    priority: "Medium",
    dueDate: "Today",
    status: "Completed",
  },
  {
    id: 4,
    task: "Follow-up Call",
    patient: {
      name: "Dewi Lestari",
      id: "2024-003456",
    },
    priority: "Medium",
    dueDate: "Today",
    status: "In Progress",
  },
  {
    id: 5,
    task: "Referral Letter",
    patient: {
      name: "Eko Prasetyo",
      id: "2024-004567",
    },
    priority: "Low",
    dueDate: "Tomorrow",
    status: "Scheduled",
  },
];

export default function TasksPage() {
  const pendingCount = tasksData.filter((t) => t.status === "Scheduled").length;
  const inProgressCount = tasksData.filter(
    (t) => t.status === "In Progress",
  ).length;
  const completedCount = tasksData.filter(
    (t) => t.status === "Completed",
  ).length;

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
            <span className="text-gray-800 font-medium">Tasks</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Manage Tasks Data
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Pending Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {pendingCount}
                </div>
                <div className="text-sm text-gray-600 font-medium">Pending</div>
              </div>
            </div>

            {/* In Progress Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {inProgressCount}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  In Progress
                </div>
              </div>
            </div>

            {/* Completed Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {completedCount}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Completed
                </div>
              </div>
            </div>
          </div>

          {/* Pending Task Table */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Pending Task
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasksData.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {task.task}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
                              {task.patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {task.patient.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {task.patient.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <PriorityBadge priority={task.priority} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {task.dueDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={task.status} />
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

// Priority Badge Component
function PriorityBadge({ priority }: { priority: string }) {
  const getStyles = () => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStyles()}`}
    >
      {priority}
    </span>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const getStyles = () => {
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
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStyles()}`}
    >
      {status}
    </span>
  );
}
