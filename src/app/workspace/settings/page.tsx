"use client";
import React, { Fragment, useState } from "react";
import { InputText, Button, Toast } from "../../../components/atoms";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "Dr. Alexander",
    email: "alexander@example.id",
    specialization: "Internal Doctor",
    licenseNumber: "DOC-2024-12345",
  });

  const [security, setSecurity] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setShowToast(true);
    }, 500);
  };

  return (
    <Fragment>
      {showToast && (
        <Toast
          message="Changes saved successfully"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="pb-10 overflow-auto -mt-5">
        {/* Header Section */}
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="hover:text-gray-700">FHIR Health</span>
            <i className="ki-outline ki-right text-xs mx-2"></i>
            <span className="hover:text-gray-700">Profile</span>
            <i className="ki-outline ki-right text-xs mx-2"></i>
            <span className="text-gray-800 font-medium">Settings</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
              <p className="text-base text-gray-600 px-0.5 pb-3">
                Edit Your Information
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 overflow-auto bg-transparent pt-4 sm:px-6 lg:px-8 mt-2 space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-300">
            <div className="p-6 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Information
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <InputText
                label="Full Name"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
              <InputText
                label="Email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
              <InputText
                label="Specialization"
                value={profile.specialization}
                onChange={(e) =>
                  setProfile({ ...profile, specialization: e.target.value })
                }
              />
              <InputText
                label="License Number"
                value={profile.licenseNumber}
                onChange={(e) =>
                  setProfile({ ...profile, licenseNumber: e.target.value })
                }
              />
              <div className="pt-4">
                <Button
                  text="Save Changes"
                  appearance="primary"
                  className="w-full !bg-teal-600 !border-teal-600 hover:!bg-teal-700 hover:!border-teal-700 text-white !text-center"
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-300">
            <div className="p-6 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-800">Security</h2>
            </div>
            <div className="p-6 space-y-4">
              <InputText
                label="Password"
                type="password"
                placeholder="*****"
                value={security.password}
                onChange={(e) =>
                  setSecurity({ ...security, password: e.target.value })
                }
              />
              <InputText
                label="New Password"
                type="password"
                placeholder="*****"
                value={security.newPassword}
                onChange={(e) =>
                  setSecurity({ ...security, newPassword: e.target.value })
                }
              />
              <InputText
                label="Confirm Password"
                type="password"
                placeholder="*****"
                value={security.confirmPassword}
                onChange={(e) =>
                  setSecurity({ ...security, confirmPassword: e.target.value })
                }
              />
              <div className="pt-4">
                <Button
                  text="Update Password"
                  appearance="primary"
                  className="w-full !bg-teal-600 !border-teal-600 hover:!bg-teal-700 hover:!border-teal-700 text-white !text-center"
                  onClick={handleSave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
