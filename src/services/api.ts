import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define interfaces for data structures
interface PaginatedResponse<T> {
  data: {
    orderBy: string;
    orderDirection: string;
    pageNumber: number;
    pageSize: number;
    totalData: number;
    roles: T[];
    members: T[];
    packages: T[];
    menu: T[];
    teams: T[];
    team: any;
    contract: any;
  };
}

export interface RoleData {
  id: number;
  name: string;
  status: string;
  description: string;
  authorizedMenu: any[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemberData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuData {
  id: number;
  name: string;
  category: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  selectedMenu: Array<number>;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamData {
  id: number;
  teamName: string;
  companyName: string;
  hqAddress: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  managerPhone: string;
  imageUrl: string;
  contractNumber: string;
  activePeriodStart: string;
  activePeriodEnd: string;
  memberQuota: number;
  packageId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContractData {
  teamId: number;
  contractNumber: string;
  activePeriodStart: string;
  activePeriodEnd: string;
  memberQuota: number;
  packageId: number;
  status: string;
}

interface PayloadType {
  teamName: string;
  companyName: string;
  hqAddress: string;
  managerName: string;
  managerEmail: string;
  managerPhone: string;
  imageUrl: string;
  contractNumber: string;
  activePeriodStart: string;
  activePeriodEnd: string;
  memberQuota: number;
  packageId: number;
}

export interface ResponseMenuData {
  data: {
    id: number;
    name: string;
    description: string;
    urlMenu: string;
    iconMenu: string;
    category: string;
    orderingNumber: number;
    parentMenu: JSON;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponsePackageData {
  data: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    selectedMenu: Array<number>;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseRoleData {
  data: {
    id: number;
    name: string;
    status: string;
    description: string;
    authorizedMenu: any[];
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseTeamData {
  data: {
    id: number;
    teamName: string;
    companyName: string;
    hqAddress: string;
    managerName: string;
    managerEmail: string;
    managerPhone: string;
    imageUrl: string;
    contractNumber: string;
    activePeriodStart: string;
    activePeriodEnd: string;
    memberQuota: number;
    packageId: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ResponseMemberData {
  data: {
    id: number;
    uid: string | null;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    fullName: string;
    employeeNumber: string;
    profileImage: string;
    joinedDate: string;
    resignedDate: string;
    homeAddress: string;
    idCardAddress: string;
    province: string;
    regency: string;
    district: string;
    subDistrict: string;
    village: string;
    postalCode: string;
    birthPlace: string;
    birthDate: string;
    gender: string;
    nationality: string;
    religion: string;
    maritalStatus: string;
    role: RoleData;
    team: TeamData;
    status: string;
    administration: any;
    relatives: any;
    createdAt: string;
    updatedAt: string;
  };
}

// API setup
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    // Add token to the request headers if available
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Roles", "Members", "Packages", "Menus", "Teams"],

  endpoints: (builder) => ({
    /** Roles Endpoint */
    getRoles: builder.query<
      PaginatedResponse<RoleData>,
      {
        keyword: string;
        status: string;
        pageSize: number;
        page: number;
        orderBy: string;
        orderDirection: string;
        startDate: string;
        endDate: string;
      }
    >({
      query: ({
        keyword,
        status,
        pageSize,
        page,
        orderBy,
        orderDirection,
        startDate,
        endDate,
      }) => {
        let queryString = "/roles?";

        // Append filters to the query string if they exist
        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;
        if (orderBy) queryString += `&sortBy=${orderBy}`;
        if (orderDirection) queryString += `&sortOrder=${orderDirection}`;
        if (startDate && endDate) {
          queryString += `&startDate=${startDate}&endDate=${endDate}`;
        }

        return queryString;
      },
      providesTags: ["Roles"],
    }),
    getRoleById: builder.query<ResponseRoleData, number>({
      query: (id) => `/roles/${id}`,
      providesTags: ["Roles"],
    }),
    createRole: builder.mutation<void, Partial<RoleData>>({
      query: (newRole) => ({
        url: "/roles",
        method: "POST",
        body: JSON.stringify(newRole),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Roles"],
    }),
    updateRole: builder.mutation<
      void,
      { id: number; updates: Partial<RoleData> }
    >({
      query: ({ id, updates }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteRole: builder.mutation<void, number>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
    restoreRole: builder.mutation<void, number>({
      query: (id) => ({
        url: `/roles/restore/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Roles"],
    }),

    getMembers: builder.query<
      PaginatedResponse<MemberData>,
      {
        keyword: string;
        status: string;
        pageSize: number;
        page: number;
        orderBy: string;
        orderDirection: string;
        id: number;
      }
    >({
      query: ({
        keyword,
        status,
        pageSize,
        page,
        orderBy,
        orderDirection,
        id,
      }) => {
        let queryString = "/members?";

        // Append filters to the query string if they exist
        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;
        if (orderBy) queryString += `&sortBy=${orderBy}`;
        if (orderDirection) queryString += `&sortOrder=${orderDirection}`;
        if (id) queryString += `&teamId=${id}`;

        return queryString;
      },
      providesTags: ["Members"],
    }),
    getMemberById: builder.query<ResponseMemberData, number>({
      query: (id) => `/members/${id}`,
      providesTags: ["Members"],
    }),
    createMember: builder.mutation<
      void,
      {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        teamId: string;
        roleId: string;
      }
    >({
      query: (newMember) => ({
        url: "/members",
        method: "POST",
        body: JSON.stringify(newMember),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Members"],
    }),
    updateMember: builder.mutation<
      void,
      { id: number; updates: Partial<MemberData> }
    >({
      query: ({ id, updates }) => ({
        url: `/members/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Members"],
    }),
    deleteMember: builder.mutation<void, number>({
      query: (id) => ({
        url: `/members/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Members"],
    }),

    /** Menu Endpoint */
    getMenus: builder.query<
      PaginatedResponse<MenuData>,
      {
        keyword: string;
        status: string;
        pageSize: number;
        page: number;
        orderBy: string;
        orderDirection: string;
        startDate: string;
        endDate: string;
      }
    >({
      query: ({
        keyword,
        status,
        pageSize,
        page,
        orderBy,
        orderDirection,
        startDate,
        endDate,
      }) => {
        let queryString = "/menu?";

        // Append filters to the query string if they exist
        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;
        if (orderBy) queryString += `&sortBy=${orderBy}`;
        if (orderDirection) queryString += `&sortOrder=${orderDirection}`;
        if (startDate && endDate)
          queryString += `&startDate=${startDate}&endDate=${endDate}`;

        return queryString;
      },
      providesTags: ["Menus"],
    }),
    getMenuById: builder.query<ResponseMenuData, number>({
      query: (id) => `/menu/${id}`,
      providesTags: ["Menus"],
    }),
    createMenu: builder.mutation<void, Partial<MenuData>>({
      query: (newMenu) => ({
        url: "/menu",
        method: "POST",
        body: JSON.stringify(newMenu),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Menus"],
    }),
    updateMenu: builder.mutation<
      void,
      { id: number; updates: Partial<MenuData> }
    >({
      query: ({ id, updates }) => ({
        url: `/menu/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Menus"],
    }),
    deleteMenu: builder.mutation<void, number>({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menus"],
    }),
    restoreMenu: builder.mutation<void, number>({
      query: (id) => ({
        url: `/menu/restore/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Menus"],
    }),

    /** Packages Endpoint */
    getPackages: builder.query<
      PaginatedResponse<PackageData>,
      {
        keyword: string;
        status: string;
        pageSize: number;
        page: number;
        orderBy: string;
        orderDirection: string;
        startDate: string;
        endDate: string;
      }
    >({
      query: ({
        keyword,
        status,
        pageSize,
        page,
        orderBy,
        orderDirection,
        startDate,
        endDate,
      }) => {
        let queryString = "/packages?";

        // Append filters to the query string if they exist
        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;
        if (orderBy) queryString += `&sortBy=${orderBy}`;
        if (orderDirection) queryString += `&sortOrder=${orderDirection}`;
        if (startDate && endDate)
          queryString += `&startDate=${startDate}&endDate=${endDate}`;

        return queryString;
      },
      providesTags: ["Packages"],
    }),
    getPackageById: builder.query<ResponsePackageData, number>({
      query: (id) => `/packages/${id}`,
      providesTags: ["Packages"],
    }),
    createPackage: builder.mutation<void, Partial<PackageData>>({
      query: (newPackage) => ({
        url: "/packages",
        method: "POST",
        body: JSON.stringify(newPackage),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Packages"],
    }),
    updatePackage: builder.mutation<
      void,
      { id: number; updates: Partial<PackageData> }
    >({
      query: ({ id, updates }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Packages"],
    }),
    deletePackage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
    restorePackage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/packages/restore/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Packages"],
    }),
    /** Teams Endpoint */
    getTeams: builder.query<
      PaginatedResponse<TeamData>,
      {
        keyword: string;
        status: string;
        pageSize: number;
        page: number;
        orderBy: string;
        orderDirection: string;
        startDate: string;
        endDate: string;
      }
    >({
      query: ({
        keyword,
        status,
        pageSize,
        page,
        orderBy,
        orderDirection,
        startDate,
        endDate,
      }) => {
        let queryString = "/teams?";

        // Append filters to the query string if they exist
        if (keyword) queryString += `keyword=${keyword}&`;
        if (status) queryString += `status=${status}&`;
        if (pageSize) queryString += `limit=${pageSize}`;
        if (page) queryString += `&page=${page}`;
        if (orderBy) queryString += `&sortBy=${orderBy}`;
        if (orderDirection) queryString += `&sortOrder=${orderDirection}`;
        if (startDate && endDate)
          queryString += `&startDate=${startDate}&endDate=${endDate}`;

        return queryString;
      },
      providesTags: ["Teams"],
    }),
    getTeamById: builder.query<ResponseTeamData, number>({
      query: (id) => `/teams/${id}`,
      providesTags: ["Teams"],
    }),
    createTeam: builder.mutation<void, Partial<TeamData>>({
      query: (newTeam) => ({
        url: "/teams",
        method: "POST",
        body: JSON.stringify(newTeam),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Teams"],
    }),
    updateTeam: builder.mutation<
      void,
      { id: number; updates: Partial<TeamData> }
    >({
      query: ({ id, updates }) => ({
        url: `/teams/${id}`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Teams"],
    }),
    deleteTeam: builder.mutation<void, number>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teams"],
    }),
    updateTeamContract: builder.mutation<
      void,
      { id: number; updates: Partial<ContractData> }
    >({
      query: ({ id, updates }) => ({
        url: `/teams/${id}/addendum`,
        method: "PUT",
        body: JSON.stringify(updates),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useRestoreRoleMutation,
  useGetMembersQuery,
  useGetMemberByIdQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useGetMenusQuery,
  useGetMenuByIdQuery,
  useCreateMenuMutation,
  useUpdateMenuMutation,
  useDeleteMenuMutation,
  useRestoreMenuMutation,
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useRestorePackageMutation,
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useUpdateTeamContractMutation,
} = api;
