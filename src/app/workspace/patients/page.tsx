"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";

// Mock patient data
const patientsData = [
  {
    id: 1,
    fullName: "Budi Santoso",
    patientId: "2024-001234",
    age: 52,
    gender: "Male",
    condition: "Diabetes Mellitus T2",
    lastVisit: "13th Feb, 2026",
    avatar: "/avatars/patient1.png",
  },
  {
    id: 2,
    fullName: "Siti Aminah",
    patientId: "2024-001567",
    age: 45,
    gender: "Female",
    condition: "Hipertensi",
    lastVisit: "13th Feb, 2026",
    avatar: "/avatars/patient2.png",
  },
  {
    id: 3,
    fullName: "Ahmad Fauzi",
    patientId: "2024-002341",
    age: 67,
    gender: "Male",
    condition: "CAD",
    lastVisit: "13th Feb, 2026",
    avatar: "/avatars/patient3.png",
  },
  {
    id: 4,
    fullName: "Dewi Lestari",
    patientId: "2024-003456",
    age: 38,
    gender: "Female",
    condition: "Asthma",
    lastVisit: "13th Feb, 2026",
    avatar: "/avatars/patient4.png",
  },
  {
    id: 5,
    fullName: "Eko Prasetyo",
    patientId: "2024-004567",
    age: 55,
    gender: "Male",
    condition: "CKD Stage 3",
    lastVisit: "13th Feb, 2026",
    avatar: "/avatars/patient5.png",
  },
];

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPatients = patientsData.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
            <span className="text-gray-800 font-medium">Patients</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Manage Patients Data
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2">
          {/* Patients List Card */}
          <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Patients List
              </h2>
              <div className="flex gap-3">
                {/* Search Input */}
                <div className="relative">
                  <i className="ki-outline ki-magnifier absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                {/* Status Dropdown */}
                <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                {/* Filter Button */}
                <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors flex items-center gap-2">
                  <i className="ki-outline ki-filter"></i>
                  Filter
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg">
                <thead className="bg-gray-50 rounded-lg font-bold text-black">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Full Name
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Age
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Gender
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Condition
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Last Visit
                        <i className="ki-outline ki-sort-up-down text-gray-400"></i>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-semibold">
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {patient.lastVisit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <button className="text-gray-400 hover:text-teal-600 transition-colors">
                            <i className="ki-outline ki-notepad-edit text-lg"></i>
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <i className="ki-outline ki-trash text-lg"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Show</span>
                <select className="px-2 py-1 border border-gray-300 rounded-md">
                  <option>5</option>
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span>per page</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                  {startIndex + 1}-
                  {Math.min(startIndex + itemsPerPage, filteredPatients.length)}{" "}
                  of {filteredPatients.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ki-outline ki-left"></i>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-teal-600 text-white"
                        : "border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="ki-outline ki-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
