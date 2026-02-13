"use client";
import React, { Fragment } from "react";
import { Button } from "../../../components/atoms";

// Mock data for dashboard
const summaryData = {
  totalPatientsToday: 28,
  pendingTasks: 5,
  notifications: 12,
};

const newPatients = [
  {
    id: 1,
    fullName: "Budi Santoso",
    patientId: "2024-001234",
    lastVisit: "13th Feb, 2026",
    age: 52,
    gender: "Male",
    condition: "Diabetes Mellitus T2",
  },
  {
    id: 2,
    fullName: "Siti Aminah",
    patientId: "2024-001567",
    lastVisit: "13th Feb, 2026",
    age: 45,
    gender: "Female",
    condition: "Hipertensi",
  },
  {
    id: 3,
    fullName: "Ahmad Fauzi",
    patientId: "2024-002341",
    lastVisit: "13th Feb, 2026",
    age: 67,
    gender: "Male",
    condition: "CAD",
  },
  {
    id: 4,
    fullName: "Dewi Lestari",
    patientId: "2024-003456",
    lastVisit: "13th Feb, 2026",
    age: 38,
    gender: "Female",
    condition: "Asthma",
  },
  {
    id: 5,
    fullName: "Eko Prasetyo",
    patientId: "2024-004567",
    lastVisit: "13th Feb, 2026",
    age: 55,
    gender: "Male",
    condition: "CKD Stage 3",
  },
];

export default function DashboardOverview() {
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
            <span className="text-gray-800 font-medium">Dashboard</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                View All Summary
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Total Patients Today */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-teal-600 mb-3 p-4 ">
                  <span className="px-4 py-4 border border-gray-300 rounded-full shadow-sm">
                    {summaryData.totalPatientsToday < 10
                      ? "0" + summaryData.totalPatientsToday
                      : summaryData.totalPatientsToday}
                  </span>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Total Patients
                  <br />
                  Today
                </div>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-teal-600 mb-3 p-4 ">
                  <span className="px-4 py-4 border border-gray-300 rounded-full shadow-sm">
                    {summaryData.pendingTasks < 10
                      ? "0" + summaryData.pendingTasks
                      : summaryData.pendingTasks}
                  </span>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Total <br />
                  Pending Tasks
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-teal-600 mb-3 p-4 ">
                  <span className="px-4 py-4 border border-gray-300 rounded-full shadow-sm">
                    {summaryData.notifications < 10
                      ? "0" + summaryData.notifications
                      : summaryData.notifications}
                  </span>
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Total <br />
                  Notifications
                </div>
              </div>
            </div>
          </div>

          {/* Find Patients Search */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Find Patients
            </h2>
            <div className="flex gap-2">
              <div className="relative w-full">
                <i className="ki-outline ki-magnifier absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <Button
                appearance="success"
                text="Search"
                icon="ki-magnifier"
                className="!bg-teal-600 !border-teal-600 hover:!bg-teal-700 hover:!border-teal-700 text-white"
              />
            </div>
          </div>

          {/* New Patients Table */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              New Patients
            </h2>

            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full border-collapse border border-gray-300 divide-y divide-gray-200">
                <thead className="bg-gray-50 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 font-bold">
                        Last Visit
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 font-bold">
                        Full Name
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 font-bold">
                        Age
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 font-bold">
                        Gender
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2 font-bold">
                        Condition
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {newPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {patient.lastVisit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                              {patient.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {patient.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {patient.patientId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {patient.age}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {patient.gender}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {patient.condition}
                        </div>
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
