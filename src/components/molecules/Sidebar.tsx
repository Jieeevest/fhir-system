"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetUserQuery } from "@/services/authApi";
import { usePathname, useRouter } from "next/navigation";
import { useGetMenusQuery } from "@/services/api";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  separator: string;
  subItems?: SubNavItem[];
}

interface SubNavItem {
  href: string;
  label: string;
  icon: string;
  subItems?: SubNavItem[];
}

const navItems: NavItem[] = [
  {
    // href: "/workspace/dashboard",
    href: "/workspace/dashboard",
    label: "Dashboard",
    icon: "ki-element-11",
    separator: "",
  },
  {
    href: "/workspace/patients",
    label: "Patients",
    icon: "ki-user",
    separator: "",
  },
  {
    href: "/workspace/schedules",
    label: "Schedules",
    icon: "ki-calendar",
    separator: "",
  },
  {
    href: "/workspace/tasks",
    label: "Tasks",
    icon: "ki-note-2",
    separator: "",
  },
  {
    href: "/workspace/reports",
    label: "Reports",
    icon: "ki-document",
    separator: "",
  },
  {
    href: "/workspace/settings",
    label: "Settings",
    icon: "ki-setting-2",
    separator: "",
  },
];

const filter = {
  keyword: "Backoffice",
  status: "active",
  pageSize: 50,
  page: 1,
  totalData: 0,
  orderBy: "orderingNumber",
  orderDirection: "asc",
  startDate: "",
  endDate: "",
  filterBy: [],
} as {
  keyword: string;
  status: string;
  pageSize: number;
  page: number;
  totalData: number;
  orderBy: string;
  orderDirection: string;
  startDate: string;
  endDate: string;
  filterBy: Array<string>;
};

export default function Sidebar() {
  const [roleId, setRoleId] = useState<any>(null);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [sidebarMenu, setSidebarMenu] = useState<any>([]);
  const [authorizedMenu, setAuthorizedMenu] = useState<any>([]);

  const { data } = useGetUserQuery<any>();
  const { data: menuData } = useGetMenusQuery(filter);
  const pathname = usePathname();

  useEffect(() => {
    if (data) {
      setRoleId(data?.data?.role.id);
      setAuthorizedMenu(data?.data?.role.authorizedMenu);
    }
  }, [data]);

  useEffect(() => {
    const authorizedList = authorizedMenu
      ?.filter((item: any) => item?.type == "SIAP Backoffice")
      ?.map((item: any) => item?.id);
    setSidebarMenu(
      menuData?.data?.menu.filter((item: any) =>
        authorizedList?.includes(item?.id),
      ),
    );
  }, [menuData, authorizedMenu]);

  const handleToggleMenu = (index: number) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  const groupedNavItems = navItems.reduce<Record<string, NavItem[]>>(
    (groups, item, index) => {
      // if (roleId !== 1 && (index === 3 || index === 4)) {
      //   return groups;
      // }

      if (!groups[item.separator]) {
        groups[item.separator] = [];
      }
      groups[item.separator].push(item);
      return groups;
    },
    {},
  );

  const isActive = (href: string) => {
    return pathname === href || pathname.includes(href);
  };

  return (
    <div className="absolute">
      <div
        className={`lg:w-64 w-full h-screen bg-white text-black fixed top-0 left-0 z-40 shadow-sm border-r-[1px] border-gray-300 transform -translate-x-full lg:translate-x-0`}
      >
        <div className="p-6 px-2">
          {/* FHIR Health Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">FHIR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">FHIR Health</h1>
              <p className="text-xs text-gray-600">Information System</p>
            </div>
          </div>
          <div>
            {Object.entries(groupedNavItems).map(
              ([group, items], groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  {/* Group Title */}
                  <h3 className="text-gray-600 uppercase text-sm font-bold mb-3">
                    {group}
                  </h3>

                  {/* Group Items */}
                  <ul className="space-y-6">
                    {items.map((item, index) => (
                      <li key={index}>
                        <div>
                          <div
                            onClick={() =>
                              item.subItems && handleToggleMenu(index)
                            }
                            className={`flex items-center justify-between hover:text-slate-900 transition-colors cursor-pointer`}
                          >
                            <Link
                              href={item.href}
                              className={`flex items-center space-x-3 hover:scale-110 transition ease-in-out delay-75 ${
                                isActive(item.href) ? "scale-110" : ""
                              }`}
                            >
                              <i
                                className={`text-2xl ki-outline ${item.icon}`}
                              ></i>
                              <span
                                className={`${
                                  isActive(item.href)
                                    ? "font-bold"
                                    : "font-medium"
                                }`}
                              >
                                {item.label}
                              </span>
                            </Link>
                            {item.subItems && (
                              <i
                                className={`text-sm font-bold ki-outline ${
                                  openMenuIndex === index
                                    ? "ki-minus"
                                    : "ki-plus"
                                } text-gray-600 ml-auto hover:scale-110 transition ease-in-out delay-75`}
                              ></i>
                            )}
                          </div>

                          {/* Render SubItems */}
                          {item.subItems && openMenuIndex === index && (
                            <ul className="pl-6 mt-4 space-y-4 transition-all duration-300 ease-in-out">
                              {item.subItems.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    href={subItem.href}
                                    className={`flex items-center space-x-3 hover:text-blue-400 transition-colors ${
                                      isActive(subItem.href) ? "font-bold" : ""
                                    }`}
                                  >
                                    <i
                                      className={`text-2xl ki-outline ${subItem.icon}`}
                                    ></i>
                                    <span className="font-semibold">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
