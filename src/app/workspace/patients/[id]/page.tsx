"use client";
import React, { Fragment } from "react";
import { useParams } from "next/navigation";

// Mock patient detail data
const patientDetails: Record<string, any> = {
  "1": {
    fullName: "Budi Santoso",
    age: 52,
    email: "budi.santoso@example.id",
    phone: "+62 821-XXXX-XXXX",
    identityNumber: "2024-001234",
    homeAddress: "Jl. Merdeka No. 123, Jakarta Pusat",
    subdistrict: "Menteng",
    district: "Jakarta Pusat",
    birthplace: "Jakarta",
    birthday: "15 Jun, 1974",
    gender: "Male",
    nationality: "Indonesia",
    religion: "Islam",
    taxNo: "85.782.025.2-066.000",
    idCardNo: "3174105306740004",
    passportNo: "AM1234567",
    familyCardNo: "31.72.03.04.5678",
    maritalStatus: "Married",
  },
  "2": {
    fullName: "Siti Aminah",
    age: 45,
    email: "siti.aminah@example.id",
    phone: "+62 821-XXXX-XXXX",
    identityNumber: "2024-001567",
    homeAddress: "Perumahan Ciledug Banjir Abadi No. 13 RT. 02 RW. 02",
    subdistrict: "Ciledug",
    district: "Tangerang Kota",
    birthplace: "Dongdaemun District, Seoul",
    birthday: "13 Jan, 1975",
    gender: "Female",
    nationality: "Indonesia",
    religion: "Islam",
    taxNo: "85.782.025.2-066.000",
    idCardNo: "3174105307970004",
    passportNo: "AN1234567",
    familyCardNo: "31.72.03.04.5678",
    maritalStatus: "Widowed",
  },
};

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  const patient = patientDetails[patientId] || patientDetails["2"];

  return (
    <Fragment>
      <div className="pb-10 overflow-auto -mt-5">
        {/* Header Section */}
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="hover:text-gray-700">Management</span>
            <i className="ki-outline ki-right text-xs mx-2"></i>
            <span className="hover:text-gray-700">Teams</span>
            <i className="ki-outline ki-right text-xs mx-2"></i>
            <span className="hover:text-gray-700">Patient</span>
            <i className="ki-outline ki-right text-xs mx-2"></i>
            <span className="text-gray-800 font-medium">Details</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8">
          {/* Patient Header Card */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {patient.fullName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
              </div>

              {/* Patient Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {patient.fullName}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {patient.age} Years Old
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="ki-outline ki-sms text-teal-600"></i>
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ki-outline ki-phone text-teal-600"></i>
                    <span>{patient.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Personal Info
              </h2>
              <div className="space-y-4">
                <InfoRow label="Full Name" value={patient.fullName} />
                <InfoRow
                  label="Identity Number"
                  value={patient.identityNumber}
                />
                <InfoRow label="Email" value={patient.email} />
                <InfoRow label="Phone" value={patient.phone} />
                <InfoRow label="Home Address" value={patient.homeAddress} />
                <InfoRow label="Subdistrict" value={patient.subdistrict} />
                <InfoRow label="District" value={patient.district} />
                <InfoRow label="Birthplace" value={patient.birthplace} />
                <InfoRow label="Birthday" value={patient.birthday} />
                <InfoRow label="Gender" value={patient.gender} />
                <InfoRow label="Nationality" value={patient.nationality} />
                <InfoRow label="Religion" value={patient.religion} />
              </div>
            </div>

            {/* Administrative Info Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Administrative Info
              </h2>
              <div className="space-y-4">
                <InfoRow label="Tax No." value={patient.taxNo} />
                <InfoRow label="ID Card No." value={patient.idCardNo} />
                <InfoRow label="Passport No." value={patient.passportNo} />
                <InfoRow label="Family Card No." value={patient.familyCardNo} />
                <InfoRow label="Marital Status" value={patient.maritalStatus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// Helper component for info rows
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center border-b border-gray-100 pb-3">
      <div className="text-sm font-medium text-gray-500 w-48 flex-shrink-0">
        {label}
      </div>
      <div className="text-sm text-gray-900 mt-1 sm:mt-0">{value}</div>
    </div>
  );
}
