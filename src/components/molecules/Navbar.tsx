"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ConfirmationModal } from "../atoms";
import Loading from "./Loading";
import { useDispatch } from "react-redux";
import { api } from "@/services/api";
import { useGetUserQuery } from "@/services/authApi";
import Image from "next/image";

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathSegments = usePathname().split("/").filter(Boolean);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState<{
    name: string | null;
    email: string | null;
    image: string | null;
  }>({
    name: "",
    email: "",
    image: "",
  });
  const { data: userData } = useGetUserQuery<any>();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    setOpenModal(true);
  };

  const _executeLogout = () => {
    localStorage.clear();
    dispatch(api.util.resetApiState());
    router.push("/auth/login");
    setLoading(true);
  };

  useEffect(() => {
    setUser({
      name: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      image: userData?.data?.profileImage,
    });
  }, [userData?.data]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <Loading />;

  return (
    <nav className="w-full z-50 h-20 text-gray-800 bg-white border-b border-gray-300 mb-5 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 pt-4">
          {/* Left Section: Breadcrumbs */}
          <div className="flex items-center space-x-2 font-normal text-sm"></div>

          {/* Right Section: Name with Dropdown */}
          <div
            className="flex items-center space-x-4 relative"
            ref={dropdownRef}
          >
            {/* User Name */}
            <div
              className="cursor-pointer flex items-center gap-2 text-sm font-medium"
              onClick={toggleDropdown}
            >
              <Image
                priority
                src={
                  user?.image
                    ? "http://" + user?.image
                    : "https://randomuser.me/api/portraits/men/1.jpg"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full border-[1px] border-gray-300"
                width={40}
                height={40}
              />
              <span className="">{user.name}</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-50 right-0 mt-60 w-60 bg-white text-gray-800 rounded-lg shadow-sm border-[1px] border-gray-300">
                <div className="flex flex-col">
                  <Link
                    href="/workspace/profile"
                    className="px-4 pt-2 text-sm hover:bg-gray-100 rounded-tl-lg rounded-tr-lg cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 py-2 border-b-[1px] border-gray-400">
                      <img
                        src={
                          user?.image
                            ? "http://" + user?.image
                            : "https://randomuser.me/api/portraits/men/1.jpg"
                        }
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-[1px] border-gray-300"
                      />
                      <div className="pb-2">
                        <span className="text-gray-700 font-semibold">
                          {user.name}
                        </span>
                        <p className="text-gray-700 text-xs">{user.email}</p>
                      </div>
                    </div>
                  </Link>
                  <div
                    className="px-4 py-2 text-sm hover:bg-gray-100 "
                    role="button"
                    onClick={handleLogout}
                  >
                    <div className="flex space-x-2 py-2 items-center gap-2 font-semibold">
                      <i className="ki-outline ki-exit-left text-xl" />
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          showModal={openModal}
          title="Confirmation"
          message="Are you sure you want to logout?"
          buttonText="Confirm"
          buttonColor="btn-primary"
          handleClose={() => setOpenModal(false)}
          handleConfirm={() => _executeLogout()}
        />
      )}
    </nav>
  );
};

export default Navbar;
