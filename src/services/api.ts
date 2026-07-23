import axios from "axios";
import { InviteUserRequest } from "../types";


/*
|--------------------------------------------------------------------------
| USER MANAGEMENT APIs
|--------------------------------------------------------------------------
*/

export const getUsers = () =>
  api.get("/admin/users");

export const inviteUser = (
  data: InviteUserRequest
) =>
  api.post("/admin/users", data);

export const disableUser = (
  id: number
) =>
  api.patch(`/admin/users/${id}/disable`);

export const enableUser = (
  id: number
) =>
  api.patch(`/admin/users/${id}/enable`);


export const updateUser = (
  id: number,
  data: {
    name: string;
    department: string;
    role: "ADMIN" | "EMPLOYEE";
  }
) => api.put(`/admin/users/${id}`, data);  


/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
*/

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

/*
|--------------------------------------------------------------------------
| AUTH APIs
|--------------------------------------------------------------------------
*/

export const login = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);

export const changePassword = (data: {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => api.post("/auth/change-password", data);

/*
|--------------------------------------------------------------------------
| DASHBOARD APIs
|--------------------------------------------------------------------------
*/

export const getDashboardStats = () =>
    api.get("/dashboard/stats");

export const getRecentBookings = () =>
    api.get("/dashboard/recent-bookings");

export const getTodayBookings = () =>
    api.get("/dashboard/today");

/*
|--------------------------------------------------------------------------
| CABIN APIs
|--------------------------------------------------------------------------
*/

export const getCabins = () =>
  api.get("/cabins");

export const getCabin = (id: number) =>
  api.get(`/cabins/${id}`);

export const createCabin = (data: any) =>
  api.post("/cabins", data);

export const updateCabin = (
  id: number,
  data: any
) =>
  api.put(`/cabins/${id}`, data);

/*
|--------------------------------------------------------------------------
| BOOKING APIs
|--------------------------------------------------------------------------
*/

export const createBooking = (data: {
  cabinId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  purpose: string;
}) =>
  api.post("/bookings", data);

export const getAllBookings = () =>
  api.get("/bookings");

export const getMyBookings = () =>
  api.get("/bookings/my");

export const getPendingBookings = () =>
  api.get("/bookings/pending");

export const approveBooking = (
  bookingId: number
) =>
  api.put(`/bookings/${bookingId}/approve`);

export const rejectBooking = (
  bookingId: number
) =>
  api.put(`/bookings/${bookingId}/reject`);

export const cancelBooking = (
  bookingId: number
) =>
  api.put(`/bookings/${bookingId}/cancel`);

/*
|--------------------------------------------------------------------------
| Export Axios Instance
|--------------------------------------------------------------------------
*/

export const uploadCabinImages = (
  cabinId: number,
  files: File[]
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  return api.post(
    `/cabins/${cabinId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getCabinImages = (cabinId: number) =>
  api.get(`/cabins/${cabinId}/images`);

export const deleteCabinImage = (imageId: number) =>
  api.delete(`/cabins/images/${imageId}`);

export default api;