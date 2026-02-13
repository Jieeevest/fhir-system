"use client";
import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  Badge,
  Card,
  ConfirmationModal,
  InputCheckbox,
  InputText,
  Select,
  SuccessModal,
  TextArea,
  Button,
  Tooltip,
  Switch,
} from "@/components/atoms";
import { Loading, Error404 } from "@/components/molecules";
import { formatDate } from "@/helpers";
import {
  useGetUserQuery,
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "@/services/authApi";
import { useUploadImageMutation } from "@/services/cdnApi";
import { useRouter } from "next/navigation";
import { decryptFromMobile } from "@/helpers/decryptFromMobile";

const protocol = "http://";

export default function ProfileOverview() {
  const router = useRouter();
  const [image, setImage] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [changePersonalInfo, setChangePersonalInfo] = useState(false);
  const [changeRelativesInfo, setChangeRelativesInfo] = useState(false);
  const [changeAdministrativeInfo, setChangeAdministrativeInfo] =
    useState(false);
  const [changeSecurityInfo, setChangeSecurityInfo] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [dialCode, setDialCode] = useState("+62");
  const [statusMessage, setStatusMessage] = useState({
    message: "",
    type: "",
  });

  const [payload, setPayload] = useState<any>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    employeeNumber: "",
    joinedDate: "",
    resignedDate: "",
    idCardAddress: "",
    province: "",
    regency: "",
    subDistrict: "",
    village: "",
    postalCode: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    occupation: "",
    taxNumber: "",
    taxAttachment: "",
    identityNumber: "",
    identityAttachment: "",
    password: "",
    confirmPassword: "",
    relatives: [],
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    employeeNumber: "",
    joinedDate: "",
    resignedDate: "",
    idCardAddress: "",
    province: "",
    regency: "",
    subDistrict: "",
    village: "",
    postalCode: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    occupation: "",
    taxNumber: "",
    identityNumber: "",
    password: "",
    confirmPassword: "",
    relatives: [] as {
      fullName?: string;
      relationType?: string;
      phoneNumber?: string;
    }[],
  });

  const [profileInformation, setProfileInformation] = useState({
    email: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    fullName: "",
    employeeNumber: "",
    occupation: "",
    profileImage: "",
    joinedDate: "",
    resignedDate: "",
    idCardAddress: "",
    province: "",
    regency: "",
    subDistrict: "",
    village: "",
    postalCode: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
    authorizedMenu: [],
  });
  const [administrativeInformation, setAdministrativeInformation] = useState({
    taxNumber: "",
    identityNumber: "",
    taxAttachment: "",
    identityAttachment: "",
  });
  const [relativesInformation, setRelativesInformation] = useState<any>([]);
  const { data: memberDetail, isLoading, error, refetch } = useGetUserQuery();
  const [uploadImage] = useUploadImageMutation();
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [updateAvatar] = useUpdateAvatarMutation();

  useEffect(() => {
    if (memberDetail) {
      const currentData = memberDetail?.data;
      setProfileInformation({
        email: currentData?.email || "-",
        phoneNumber:
          currentData?.phoneNumber?.replace(/^\+\d{1,2}/, "").trim() || "-",
        firstName: currentData?.firstName || "-",
        lastName: currentData?.lastName || "-",
        fullName: currentData?.fullName || "-",
        employeeNumber: currentData?.employeeNumber || "-",
        occupation: currentData?.occupation || "-",
        profileImage: currentData?.profileImage || "-",
        joinedDate: formatDate(currentData?.joinedDate) || "-",
        resignedDate: currentData?.resignedDate
          ? formatDate(currentData?.resignedDate)
          : "-",
        idCardAddress: currentData?.idCardAddress
          ? decryptFromMobile(currentData?.idCardAddress)
          : "-",
        province: currentData?.province || "-",
        regency: currentData?.regency || "-",
        subDistrict: currentData?.subDistrict || "-",
        village: currentData?.village || "-",
        postalCode: currentData?.postalCode || "-",
        birthPlace: currentData?.birthPlace || "-",
        birthDate: formatDate(currentData?.birthDate) || "-",
        gender: currentData?.gender || "-",
        nationality: currentData?.nationality || "-",
        religion: currentData?.religion || "-",
        maritalStatus: currentData?.maritalStatus || "-",
        authorizedMenu: currentData?.role?.authorizedMenu || [],
      });
      setPayload({
        ...payload,
        firstName: currentData?.firstName || "",
        lastName: currentData?.lastName || "",
        phoneNumber:
          currentData?.phoneNumber?.replace(/^\+\d{1,2}/, "").trim() || "",
        employeeNumber: currentData?.employeeNumber || "",
        joinedDate: formatDate(currentData?.joinedDate) || "",
        resignedDate: currentData?.resignedDate
          ? formatDate(currentData?.resignedDate)
          : "",
        idCardAddress: currentData?.idCardAddress || "",
        province: currentData?.province || "",
        regency: currentData?.regency || "",
        subDistrict: currentData?.subDistrict || "",
        village: currentData?.village || "",
        postalCode: currentData?.postalCode || "",
        birthPlace: currentData?.birthPlace || "",
        birthDate: formatDate(currentData?.birthDate) || "",
        gender: currentData?.gender || "",
        nationality: currentData?.nationality || "",
        religion: currentData?.religion || "",
        maritalStatus: currentData?.maritalStatus || "",
        occupation: currentData?.occupation || "",
        taxNumber: currentData?.administration?.taxNumber || "",
        taxAttachment: currentData?.administration?.taxAttachment || "",
        identityNumber: currentData?.administration?.identityNumber || "",
        identityAttachment:
          currentData?.administration?.identityAttachment || "",
        relatives: currentData?.relatives || [],
      });
      setAdministrativeInformation({
        taxNumber: currentData?.administration?.taxNumber
          ? decryptFromMobile(currentData?.administration?.taxNumber)
          : "-",
        identityNumber: currentData?.administration?.identityNumber
          ? decryptFromMobile(currentData?.administration?.identityNumber)
          : "-",
        taxAttachment: currentData?.administration?.taxAttachment || "-",
        identityAttachment:
          currentData?.administration?.identityAttachment || "-",
      });
      setRelativesInformation(currentData?.relatives || []);
      setImage(
        currentData?.profileImage
          ? protocol + currentData?.profileImage
          : "https://randomuser.me/api/portraits/men/1.jpg"
      );
    }
  }, [memberDetail?.data]);

  const handleAddRelative = () => {
    const newRelative = {
      fullName: "",
      relationType: "",
      phoneNumber: "",
      isEmergency: false,
    };
    setPayload({
      ...payload,
      relatives: [...payload.relatives, newRelative],
    });
  };

  const handleRemoveRelative = (index: number) => {
    const newRelatives = [...payload.relatives];
    newRelatives.splice(index, 1);
    setPayload({
      ...payload,
      relatives: newRelatives,
    });
  };

  const validateFormPersonal = () => {
    const newErrors = {
      phoneNumber: payload.phoneNumber ? "" : "Phone Number is required.",
      joinedDate: payload.joinedDate ? "" : "Joined Date is required.",
      idCardAddress: payload.idCardAddress
        ? ""
        : "ID Card Address is required.",
      province: payload.province ? "" : "Province is required.",
      regency: payload.regency ? "" : "Regency is required.",
      subDistrict: payload.subDistrict ? "" : "Sub District is required.",
      village: payload.village ? "" : "Village is required.",
      postalCode: payload.postalCode ? "" : "Postal Code is required.",
      birthPlace: payload.birthPlace ? "" : "Birth Place is required.",
      birthDate: payload.birthDate ? "" : "Birth Date is required.",
      gender: payload.gender ? "" : "Gender is required.",
      nationality: payload.nationality ? "" : "Nationality is required.",
      religion: payload.religion ? "" : "Religion is required.",
    };

    setErrors({ ...errors, ...newErrors });
    return Object.values(newErrors).every((error) => !error);
  };

  const validateFormAdministrative = () => {
    const newErrors = {
      taxNumber: payload.taxNumber ? "" : "Tax Number is required.",
      identityNumber: payload.identityNumber
        ? ""
        : "Identity Number is required.",
      maritalStatus: payload.maritalStatus ? "" : "Marital Status is required.",
    };

    setErrors({ ...errors, ...newErrors });
    return Object.values(newErrors).every((error) => !error);
  };

  const validateFormSecurity = () => {
    const newErrors = {
      password: payload.password ? "" : "Password is required.",
      confirmPassword:
        payload.confirmPassword !== payload.password
          ? "Passwords do not match."
          : payload.confirmPassword
          ? ""
          : "Confirm Password is required.",
    };

    setErrors({ ...errors, ...newErrors });
    return Object.values(newErrors).every((error) => !error);
  };

  const validateFormRelative = () => {
    const newErrors = { ...errors, relatives: [] }; // Salin error lama, reset relatives

    const updatedRelativesErrors = payload.relatives.map((relative: any) => {
      const relativeErrors: Record<string, string> = {};

      if (!relative.fullName) {
        relativeErrors.fullName = "Full name is required";
      }
      if (!relative.relationType) {
        relativeErrors.relationType = "Relation type is required";
      }
      if (!relative.phoneNumber) {
        relativeErrors.phoneNumber = "Phone number is required";
      }

      return relativeErrors;
    });

    newErrors.relatives = updatedRelativesErrors;
    setErrors(newErrors);

    return updatedRelativesErrors.every(
      (err: any) => Object.keys(err).length === 0
    );
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return console.log("No file selected");

    // Create a FormData object to hold the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      const cdnData = await uploadImage(formData).unwrap();
      const fileUrl = cdnData?.data?.fileUrl;
      await updateAvatar({
        newImage: fileUrl,
      }).unwrap();
      setImage(protocol + fileUrl);
      setStatusMessage({
        message: "Image uploaded successfully!",
        type: "Success",
      });
      setSuccessModal(true);
    } catch (error) {
      console.log("There was an error uploading the image");
    }
  };

  const handleChange = (key: string, value: any) => {
    if (value) setErrors((prev: any) => ({ ...prev, [key]: "" }));
    return setPayload({
      ...payload,
      [key]: value,
    });
  };

  const handleChangeRelative = (key: string, index: number, value: any) => {
    let newRelatives = [...payload.relatives];

    // Buat salinan objek sebelum mengubahnya
    newRelatives[index] = { ...newRelatives[index], [key]: value };

    // Jika key yang diubah adalah "isEmergency" dan bernilai `true`, reset yang lain ke `false`
    if (key === "isEmergency" && value === true) {
      newRelatives = newRelatives.map((relative, i) => ({
        ...relative,
        isEmergency: i === index, // Hanya index yang dipilih yang menjadi true
      }));
    }

    setErrors((prev: any) => {
      const newErrors = { ...prev };

      if (!newErrors.relatives) {
        newErrors.relatives = [];
      }

      if (!newErrors.relatives[index]) {
        newErrors.relatives[index] = {};
      }

      if (value) {
        delete newErrors.relatives[index][key];
      }

      if (Object.keys(newErrors.relatives[index]).length === 0) {
        delete newErrors.relatives[index];
      }

      return newErrors;
    });

    return setPayload({
      ...payload,
      relatives: newRelatives,
    });
  };

  const handleSubmit = async (type: string) => {
    if (type === "administrative" && validateFormAdministrative()) {
      setModalMessage("Are you sure to update administrative information?");
      setIsUpdatePassword(false);
      setOpenModal(true);
    } else if (type === "personal" && validateFormPersonal()) {
      setModalMessage("Are you sure to update personal information?");
      setIsUpdatePassword(false);
      setOpenModal(true);
    } else if (type === "security" && validateFormSecurity()) {
      setModalMessage("Are you sure to update your password?");
      setIsUpdatePassword(true);
      setOpenModal(true);
    } else if (type === "relative" && validateFormRelative()) {
      setModalMessage("Are you sure to update relative information?");
      setIsUpdatePassword(false);
      setOpenModal(true);
    }
  };

  const _executeSubmit = async () => {
    setLoading(true);
    try {
      if (isUpdatePassword) {
        const objectPayload = {
          newPassword: payload.password,
        };
        await updatePassword(objectPayload)
          .unwrap()
          .then(() => {
            setLoading(false);
            setChangeSecurityInfo(false);
            setStatusMessage({
              message: "Password updated successfully!",
              type: "Success",
            });
            setOpenModal(false);
            setSuccessModal(true);
          });
      } else {
        const objectPayload = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          phoneNumber: dialCode + payload.phoneNumber.replace(/^0/, ""),
          employeeNumber: payload.employeeNumber,
          joinedDate: payload.joinedDate,
          resignedDate: payload.resignedDate,
          idCardAddress: payload.idCardAddress,
          province: payload.province,
          regency: payload.regency,
          subDistrict: payload.subDistrict,
          village: payload.village,
          postalCode: payload.postalCode,
          birthPlace: payload.birthPlace,
          birthDate: payload.birthDate,
          gender: payload.gender,
          nationality: payload.nationality,
          religion: payload.religion,
          maritalStatus: payload.maritalStatus,
          taxNumber: payload.taxNumber,
          identityNumber: payload.identityNumber,
          relatives: payload.relatives,
        };
        await updateProfile(objectPayload)
          .unwrap()
          .then(() => {
            setLoading(false);
            setStatusMessage({
              message: "Profile updated successfully!",
              type: "Success",
            });
            router.refresh();
            setChangePersonalInfo(false);
            setChangeAdministrativeInfo(false);
            setChangeSecurityInfo(false);
            setChangeRelativesInfo(false);
            setOpenModal(false);
            setSuccessModal(true);
          });
      }
      refetch();
    } catch (error: any) {
      console.log(error);
    }
  };

  if (isLoading || loading) return <Loading />;
  // if (error) return <Error404 />;

  return (
    <Fragment>
      <div
        className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8 mx-auto py-20"
        style={{
          backgroundImage: "url('/sample-cover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          position: "relative",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="relative items-center gap-2 flex flex-col justify-center">
          <div className="relative w-32 h-32 hover:cursor-pointer">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full rounded-full mx-auto shadow-lg border-2 border-gray-400"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-75 transition-opacity rounded-full z-10">
              <div className="flex items-center gap-1 text-white">
                <i className="ki-outline ki-file-up text-base"></i>
                <span className="font-semibold text-xs hover:underline underline-offset-4">
                  Change Image
                </span>
                {/* The file input is positioned on top of the image */}
                <input
                  type="file"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          {/* Team Name */}
          <p className="text-gray-900 font-semibold mt-2 mb-10 text-center">
            {memberDetail?.data?.fullName}
          </p>
        </div>
      </div>

      <div className="pb-20">
        <div className="px-10 bg-transparent pt-4 sm:px-6 lg:px-8 mb-5">
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <div className="mb-4">
                <Card
                  styleHeader="flex px-2 items-center justify-between"
                  contentHeader={
                    <>
                      <div>
                        <p className="font-semibold justify-start">
                          Security Information
                        </p>
                      </div>
                      <div className="flex gap-2 text-sm justify-end right-0">
                        {!changeSecurityInfo ? (
                          <Tooltip text="Edit">
                            <i
                              className="text-2xl bg-slate-50 h-6 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                              role="button"
                              onClick={() => {
                                setChangeSecurityInfo(true);
                              }}
                            ></i>
                          </Tooltip>
                        ) : (
                          <>
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="light"
                              text="Cancel"
                              onClick={() => {
                                setErrors({
                                  ...errors,
                                  password: "",
                                  confirmPassword: "",
                                });
                                setChangeSecurityInfo(false);
                              }}
                            />
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="primary"
                              text="Save Changes"
                              onClick={() => handleSubmit("security")}
                            />
                          </>
                        )}
                      </div>
                    </>
                  }
                >
                  <div className="px-1 gap-4">
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        {changeSecurityInfo && "New"} Password
                        {changeSecurityInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changeSecurityInfo ? (
                        <InputText
                          type="password"
                          placeholder="Enter password..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("password", e.target.value)
                          }
                          value={payload.password}
                          error={errors.password}
                        />
                      ) : (
                        <p>{"********"}</p>
                      )}
                    </div>
                    {changeSecurityInfo && (
                      <div className="flex items-center gap-2 justify-start text-sm mb-2">
                        <p className="font-semibold w-64">
                          Confirmation Password
                          {changeSecurityInfo && (
                            <span className="text-red-500">*</span>
                          )}
                        </p>
                        {changeSecurityInfo ? (
                          <InputText
                            type="password"
                            placeholder="Enter confirmation password..."
                            className="w-[335px]"
                            onChange={(e) =>
                              handleChange("confirmPassword", e.target.value)
                            }
                            value={payload.confirmPassword}
                            error={errors.confirmPassword}
                          />
                        ) : null}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
              <div className="mb-4">
                <Card
                  styleHeader="flex px-2 items-center justify-between"
                  contentHeader={
                    <>
                      <div>
                        <p className="font-semibold justify-start">
                          Personal Information
                        </p>
                      </div>
                      <div className="flex gap-2 text-sm justify-end right-0">
                        {!changePersonalInfo ? (
                          <Tooltip text="Edit">
                            <i
                              className="text-2xl bg-slate-50 h-6 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                              role="button"
                              onClick={() => {
                                setChangePersonalInfo(true);
                              }}
                            ></i>
                          </Tooltip>
                        ) : (
                          <>
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="light"
                              text="Cancel"
                              onClick={() => setChangePersonalInfo(false)}
                            />
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="primary"
                              text="Save Changes"
                              onClick={() => handleSubmit("personal")}
                            />
                          </>
                        )}
                      </div>
                    </>
                  }
                >
                  <div className="px-1 gap-4 h-120">
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">Full Name</p>
                      {changePersonalInfo ? (
                        <Tooltip
                          text="You can't edit this field"
                          className="cursor-not-allowed"
                        >
                          <div className="flex justify-between items-center gap-2 w-[335px]">
                            <InputText
                              type="text"
                              required={true}
                              placeholder="Enter your first name..."
                              className="w-1/2"
                              value={payload.firstName}
                              isDisabled
                              onChange={(e) =>
                                handleChange("firstName", e.target.value)
                              }
                              // error={errors.firstName || ""}
                            />
                            <InputText
                              type="text"
                              required={true}
                              placeholder="Enter your last name..."
                              className="w-1/2"
                              value={payload.lastName}
                              isDisabled
                              onChange={(e) =>
                                handleChange("lastName", e.target.value)
                              }
                              // error={errors.lastName || ""}
                            />
                          </div>
                        </Tooltip>
                      ) : (
                        <p>{profileInformation.fullName}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Employee Number
                        {/* {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )} */}
                      </p>
                      {changePersonalInfo ? (
                        <Tooltip text="Only Manager who can edit this field">
                          <InputText
                            type="text"
                            placeholder="Enter employee number..."
                            className="w-[335px]"
                            isDisabled
                            onChange={(e) =>
                              handleChange("teamName", e.target.value)
                            }
                            value={payload.employeeNumber || "-"}
                            error={errors.employeeNumber}
                          />
                        </Tooltip>
                      ) : (
                        <p>{profileInformation.employeeNumber}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Occupation
                        {/* {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )} */}
                      </p>
                      {changePersonalInfo ? (
                        <Tooltip text="Only Manager who can edit this field">
                          <InputText
                            type="text"
                            placeholder="Enter occupation..."
                            className="w-[335px]"
                            isDisabled
                            onChange={(e) =>
                              handleChange("occupation", e.target.value)
                            }
                            value={payload.occupation || "-"}
                            error={errors.occupation}
                          />
                        </Tooltip>
                      ) : (
                        <p>{profileInformation.occupation}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">Email</p>
                      {changePersonalInfo ? (
                        <Tooltip
                          text="You can't edit this field"
                          className="cursor-not-allowed"
                        >
                          <InputText
                            type="text"
                            placeholder="Enter email..."
                            className="w-[335px]"
                            isDisabled
                            value={profileInformation.email}
                            //   error={errors.teamName}
                          />
                        </Tooltip>
                      ) : (
                        <p>{profileInformation.email}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Phone Number
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="phone"
                          placeholder="Enter phone number..."
                          className="w-[335px]"
                          setDialCode={setDialCode}
                          onChange={(e) =>
                            handleChange("phoneNumber", e.target.value)
                          }
                          value={String(payload.phoneNumber)}
                          error={errors.phoneNumber}
                        />
                      ) : (
                        <p>{profileInformation.phoneNumber}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Join Date
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="date"
                          placeholder="Enter joined date..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("joinedDate", e.target.value)
                          }
                          value={
                            payload.joinedDate
                              ? formatDate(payload.joinedDate, "en-US", "short")
                              : ""
                          }
                          error={errors.joinedDate}
                        />
                      ) : (
                        <p>{profileInformation.joinedDate}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Resignment Date
                        {/* {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )} */}
                      </p>
                      {changePersonalInfo ? (
                        <Tooltip text="Only Manager who can edit this field">
                          <InputText
                            type="date"
                            placeholder="Enter resigned date..."
                            className="w-[335px]"
                            isDisabled
                            onChange={(e) =>
                              handleChange("resignedDate", e.target.value)
                            }
                            value={
                              payload.resignedDate
                                ? formatDate(
                                    payload.resignedDate,
                                    "en-US",
                                    "short"
                                  )
                                : ""
                            }
                            error={errors.resignedDate}
                          />
                        </Tooltip>
                      ) : (
                        <p>{profileInformation.resignedDate}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        ID Card Address
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <TextArea
                          placeholder="Enter ID card address..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("idCardAddress", e.target.value)
                          }
                          value={payload.idCardAddress}
                          error={errors.idCardAddress}
                        ></TextArea>
                      ) : (
                        <p>{profileInformation.idCardAddress}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Province
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="text"
                          placeholder="Enter province..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("province", e.target.value)
                          }
                          value={payload.province}
                          error={errors.province}
                        />
                      ) : (
                        <p>{profileInformation.province}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Regency
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="text"
                          placeholder="Enter regency..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("regency", e.target.value)
                          }
                          value={payload.regency}
                          error={errors.regency}
                        />
                      ) : (
                        <p>{profileInformation.regency}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Sub District
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="text"
                          placeholder="Enter sub district..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("subDistrict", e.target.value)
                          }
                          value={payload.subDistrict}
                          error={errors.subDistrict}
                        />
                      ) : (
                        <p>{profileInformation.subDistrict}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Village
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="text"
                          placeholder="Enter village..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("village", e.target.value)
                          }
                          value={payload.village}
                          error={errors.village}
                        />
                      ) : (
                        <p>{profileInformation.village}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Postal Code
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="number"
                          placeholder="Enter postal code..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("postalCode", e.target.value)
                          }
                          value={payload.postalCode}
                          error={errors.postalCode}
                        />
                      ) : (
                        <p>{profileInformation.postalCode}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Birth Place
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="text"
                          placeholder="Enter birth place..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("birthPlace", e.target.value)
                          }
                          value={payload.birthPlace}
                          error={errors.birthPlace}
                        />
                      ) : (
                        <p>{profileInformation.birthPlace}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Birth Date
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="date"
                          placeholder="Enter birth date..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("birthDate", e.target.value)
                          }
                          value={
                            payload.birthDate
                              ? formatDate(payload.birthDate, "en-US", "short")
                              : ""
                          }
                          error={errors.birthDate}
                        />
                      ) : (
                        <p>{profileInformation.birthDate}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Gender
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <div className="w-[335px]">
                          <Select
                            border={errors.gender ? "danger" : undefined}
                            className={`w-full`}
                            value={payload.gender}
                            onChange={(e) =>
                              handleChange("gender", e.target.value)
                            }
                            optionValue={[
                              { label: "Male", value: "male" },
                              { label: "Female", value: "female" },
                            ]}
                          />
                          {errors.gender && (
                            <p className="text-danger text-xs mt-1">
                              {errors.gender}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>{profileInformation.gender}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Nationality
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <InputText
                          type="text"
                          placeholder="Enter nationality..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("nationality", e.target.value)
                          }
                          value={payload.nationality}
                          error={errors.nationality}
                        />
                      ) : (
                        <p>{profileInformation.nationality}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Religion
                        {changePersonalInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changePersonalInfo ? (
                        <div className="w-[335px]">
                          <Select
                            border={errors.religion ? "danger" : undefined}
                            className={`w-full`}
                            value={payload.religion}
                            onChange={(e) =>
                              handleChange("religion", e.target.value)
                            }
                            optionValue={[
                              { label: "Islam", value: "Islam" },
                              { label: "Christian", value: "Christian" },
                              { label: "Buddhist", value: "Buddhist" },
                              { label: "Hindu", value: "Hindu" },
                              { label: "Others", value: "Others" },
                            ]}
                          />
                          {errors.religion && (
                            <p className="text-danger text-xs mt-1">
                              {errors.religion}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>{profileInformation.religion}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="mb-4">
                <Card
                  styleHeader="flex px-2 items-center justify-between"
                  contentHeader={
                    <>
                      <div>
                        <p className="font-semibold justify-start">
                          Relatives Information
                        </p>
                      </div>
                      <div className="flex gap-2 text-sm justify-end right-0">
                        {!changeRelativesInfo ? (
                          <Tooltip text="Edit">
                            <i
                              className="text-2xl bg-slate-50 h-6 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                              role="button"
                              onClick={() => {
                                setChangeRelativesInfo(true);
                              }}
                            ></i>
                          </Tooltip>
                        ) : (
                          <>
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="light"
                              text="Cancel"
                              onClick={() => {
                                setPayload({
                                  ...payload,
                                  relatives: relativesInformation,
                                });
                                setChangeRelativesInfo(false);
                              }}
                            />
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="primary"
                              text="Save Changes"
                              onClick={() => handleSubmit("relative")}
                            />
                          </>
                        )}
                      </div>
                    </>
                  }
                >
                  {changeRelativesInfo && (
                    <div className="flex justify-start mb-2">
                      <Button
                        className="btn-sm"
                        type="pill"
                        appearance="dark"
                        text="Add Relative"
                        icon="ki-outline ki-plus"
                        onClick={() => handleAddRelative()}
                      />
                    </div>
                  )}
                  {payload.relatives?.length ? (
                    payload.relatives?.map((item: any, index: number) => (
                      <div
                        className="py-4 px-6 gap-4 h-full border-[1px] border-gray-300 rounded-lg mb-3"
                        key={index}
                      >
                        <div className="flex items-center gap-2 justify-between text-sm mb-2 border-b-[1px] border-gray-300 pb-2">
                          <div className="">
                            <p className="font-bold text-base">
                              Relative {index + 1}
                            </p>
                          </div>
                          {changeRelativesInfo && (
                            <div>
                              <Button
                                className="btn-xs"
                                type="pill"
                                appearance="danger"
                                text=""
                                icon="ki-outline ki-cross"
                                onClick={() => handleRemoveRelative(index)}
                              />
                            </div>
                          )}
                        </div>
                        {changeRelativesInfo && (
                          <div className="flex items-center gap-2 justify-start text-sm mb-4 mt-5">
                            <p className="font-semibold w-64">
                              Emergency
                              {/* {changeRelativesInfo && (
                                <span className="text-red-500">*</span>
                              )} */}
                            </p>
                            {changeRelativesInfo ? (
                              <Switch
                                checked={item.isEmergency}
                                onChange={(e) =>
                                  handleChangeRelative(
                                    "isEmergency",
                                    index,
                                    Boolean(e)
                                  )
                                }
                              />
                            ) : (
                              <p>{item.isEmergency}</p>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-2 justify-start text-sm mb-2">
                          <p className="font-semibold w-64">
                            Full Name
                            {changeRelativesInfo && (
                              <span className="text-red-500">*</span>
                            )}
                          </p>
                          {changeRelativesInfo ? (
                            <InputText
                              type="text"
                              placeholder="Enter full name..."
                              className="w-[300px]"
                              onChange={(e) =>
                                handleChangeRelative(
                                  "fullName",
                                  index,
                                  e.target.value
                                )
                              }
                              value={item.fullName}
                              error={errors.relatives?.[index]?.fullName}
                            />
                          ) : (
                            <p>{item.fullName}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 justify-start text-sm mb-2">
                          <p className="font-semibold w-64">
                            Relation
                            {changeRelativesInfo && (
                              <span className="text-red-500">*</span>
                            )}
                          </p>
                          {changeRelativesInfo ? (
                            <div className="w-[300px]">
                              <Select
                                border={
                                  errors.relatives?.[index]?.relationType
                                    ? "danger"
                                    : undefined
                                }
                                className={`w-full`}
                                value={item.relationType}
                                onChange={(e) =>
                                  handleChangeRelative(
                                    "relationType",
                                    index,
                                    e.target.value
                                  )
                                }
                                optionValue={[
                                  {
                                    value: "Father",
                                    label: "Father",
                                  },
                                  {
                                    value: "Mother",
                                    label: "Mother",
                                  },
                                  {
                                    value: "Brother",
                                    label: "Brother",
                                  },
                                  {
                                    value: "Sister",
                                    label: "Sister",
                                  },
                                  {
                                    value: "Uncle",
                                    label: "Uncle",
                                  },
                                  {
                                    value: "Aunt",
                                    label: "Aunt",
                                  },
                                  {
                                    value: "Cousin",
                                    label: "Cousin",
                                  },
                                  {
                                    value: "Nephew",
                                    label: "Nephew",
                                  },
                                ]}
                              />
                              {errors.relatives?.[index]?.relationType && (
                                <p className="text-danger text-xs mt-1">
                                  {errors.relatives?.[index]?.relationType}
                                </p>
                              )}
                            </div>
                          ) : (
                            <>
                              <p className="w-60">{item.relationType}</p>
                            </>
                          )}
                          {item.isEmergency && !changeRelativesInfo && (
                            <Badge appearance="danger" text="Emergency" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 justify-start text-sm mb-2">
                          <p className="font-semibold w-64">
                            Phone Number
                            {changeRelativesInfo && (
                              <span className="text-red-500">*</span>
                            )}
                          </p>
                          {changeRelativesInfo ? (
                            <InputText
                              type="number"
                              placeholder="Enter phone number..."
                              className="w-[300px]"
                              onChange={(e) =>
                                handleChangeRelative(
                                  "phoneNumber",
                                  index,
                                  e.target.value
                                )
                              }
                              value={item.phoneNumber}
                              error={errors.relatives?.[index]?.phoneNumber}
                            />
                          ) : (
                            <p>{item.phoneNumber}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center font-semibold text-sm min-h-8">
                      There is no relatives data
                    </p>
                  )}
                </Card>
              </div>
            </div>
            <div className="w-full gap-4">
              <div className="mb-4">
                <Card
                  styleHeader="flex px-2 items-center justify-between"
                  contentHeader={
                    <>
                      <div>
                        <p className="font-semibold justify-start">
                          Administrative Information
                        </p>
                      </div>
                      <div className="flex gap-2 text-sm justify-end right-0">
                        {!changeAdministrativeInfo ? (
                          <Tooltip text="Edit">
                            <i
                              className="text-2xl bg-slate-50 h-6 rounded-md ki-outline ki-notepad-edit hover:text-slate-500 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
                              role="button"
                              onClick={() => {
                                setChangeAdministrativeInfo(true);
                              }}
                            ></i>
                          </Tooltip>
                        ) : (
                          <>
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="light"
                              text="Cancel"
                              onClick={() => setChangeAdministrativeInfo(false)}
                            />
                            <Button
                              className="btn-sm"
                              type="pill"
                              appearance="primary"
                              text="Save Changes"
                              onClick={() => handleSubmit("administrative")}
                            />
                          </>
                        )}
                      </div>
                    </>
                  }
                >
                  <div className="px-1 gap-4">
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Tax Number
                        {changeAdministrativeInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changeAdministrativeInfo ? (
                        <InputText
                          type="number"
                          placeholder="Enter tax number..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("taxNumber", e.target.value)
                          }
                          value={payload.taxNumber}
                          error={errors.taxNumber}
                        />
                      ) : (
                        <p>{administrativeInformation.taxNumber}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Identity Number
                        {changeAdministrativeInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changeAdministrativeInfo ? (
                        <InputText
                          type="number"
                          placeholder="Enter identity number..."
                          className="w-[335px]"
                          onChange={(e) =>
                            handleChange("identityNumber", e.target.value)
                          }
                          value={payload.identityNumber}
                          error={errors.identityNumber}
                        />
                      ) : (
                        <p>{administrativeInformation.identityNumber}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 justify-start text-sm mb-2">
                      <p className="font-semibold w-64">
                        Marital Status
                        {changeAdministrativeInfo && (
                          <span className="text-red-500">*</span>
                        )}
                      </p>
                      {changeAdministrativeInfo ? (
                        <div className="w-[335px]">
                          <Select
                            border={errors.maritalStatus ? "danger" : undefined}
                            className={`w-full`}
                            value={payload.maritalStatus}
                            onChange={(e) =>
                              handleChange("maritalStatus", e.target.value)
                            }
                            optionValue={[
                              { label: "Single", value: "Single" },
                              { label: "Married", value: "Married" },
                              { label: "Divorced", value: "Divorced" },
                            ]}
                          />
                          {errors.maritalStatus && (
                            <p className="text-danger text-xs mt-1">
                              {errors.maritalStatus}
                            </p>
                          )}
                        </div>
                      ) : (
                        <p>{profileInformation.maritalStatus}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
              <div className="mb-4">
                <Card
                  styleHeader="flex items-center justify-between"
                  contentHeader={
                    <p className="font-semibold">App Permissions</p>
                  }
                >
                  <div className="gap-4 h-full ">
                    <div className={`w-full`}>
                      <div
                        className={`scrollable-x-auto rounded-lg border-[1px] border-gray-300 max-h-96 overflow-y-auto`}
                      >
                        <table
                          className="table table-auto"
                          data-datatable-table="true"
                        >
                          <thead>
                            <tr>
                              {[
                                { label: "Menu Name", tooltip: "", icon: "" },
                                { label: "View", tooltip: "", icon: "" },
                                { label: "Create", tooltip: "", icon: "" },
                                { label: "Update", tooltip: "", icon: "" },
                                { label: "Delete", tooltip: "", icon: "" },
                                { label: "Approval", tooltip: "", icon: "" },
                              ].map((column, index) => (
                                <th
                                  key={index}
                                  className={`${
                                    index == 0 ? "w-[335px]" : "w-[120px]"
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
                            {profileInformation?.authorizedMenu?.length ? (
                              profileInformation?.authorizedMenu.map(
                                (menu: any, rowIndex: number) => (
                                  <tr key={rowIndex} className="">
                                    <td className="p-2 flex items-center space-x-4">
                                      <div className="flex items-center space-x-4">
                                        <div>
                                          {menu.type == "SIAP Backoffice" ||
                                          menu.type == "SIAP Mobile" ? (
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
                                          <p className="font-bold">
                                            {menu.name}
                                          </p>
                                          <p className="font-light text-xs">
                                            {menu.type}
                                          </p>
                                        </div>
                                      </div>
                                    </td>

                                    {[
                                      "View",
                                      "Create",
                                      "Update",
                                      "Delete",
                                      "Approval",
                                    ].map((action) => (
                                      <td
                                        key={action}
                                        className="p-2 text-center"
                                      >
                                        <div className="justify-center items-center text-center ml-3">
                                          <InputCheckbox
                                            checked={
                                              Boolean(
                                                menu?.[action.toLowerCase()]
                                              ) || undefined
                                            }
                                          />
                                        </div>
                                      </td>
                                    ))}
                                  </tr>
                                )
                              )
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
                </Card>
              </div>
              <div className="mb-4">
                <Card
                  styleHeader="flex px-2 items-center justify-between"
                  contentHeader={
                    <p className="font-semibold">Personal Documents</p>
                  }
                >
                  <div className="px-1 gap-4 h-40">
                    <div className="flex flex-col text-sm mb-2 border-[1px] border-gray-300 rounded-md py-3 px-4">
                      <div className="flex items-center gap-2 justify-start text-sm mb-2">
                        <Image
                          priority
                          src={`http://128.199.92.238:9999/backoffice/bdbf9fc7391905bd4765fdf8b366a91e.png`}
                          alt="Image"
                          width={20}
                          height={20}
                        />
                        <div className="ml-2">
                          <p className="font-semibold">Kartu Tanda Penduduk</p>
                          <p>{"description"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text-sm mb-2 border-[1px] border-gray-300 rounded-md py-3 px-4">
                      <div className="flex items-center gap-2 justify-start text-sm mb-2">
                        <Image
                          priority
                          src={`http://128.199.92.238:9999/backoffice/bdbf9fc7391905bd4765fdf8b366a91e.png`}
                          alt="Image"
                          width={20}
                          height={20}
                        />
                        <div className="ml-2">
                          <p className="font-semibold">Kartu Keluarga</p>
                          <p>{"description"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="space-x-2"></div>
          </div>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          message={modalMessage}
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeSubmit()}
        />
      )}
      {successModal && (
        <SuccessModal
          showModal={successModal}
          title={statusMessage?.type}
          message={statusMessage?.message}
          handleClose={() => {
            setSuccessModal(false);
          }}
        />
      )}
    </Fragment>
  );
}
