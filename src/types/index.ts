/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

export interface LoginRequest {
  email: string;
  password: string;
}

export type UserStatus =
  | "ACTIVE"
  | "INVITED"
  | "DISABLED";

export interface User {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  role: "ADMIN" | "EMPLOYEE";
  status: UserStatus;
  firstLogin: boolean;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  user: User;
}

export interface InviteUserRequest {
  name: string;
  email: string;
  employeeId: string;
  department: string;
  role: "ADMIN" | "EMPLOYEE";
}

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export interface DashboardStats {
  totalCabins: number;
  availableCabins: number;
  inactiveCabins: number;
  pendingBookings: number;
  approvedBookings: number;
  rejectedBookings: number;
}

/*
|--------------------------------------------------------------------------
| Cabin
|--------------------------------------------------------------------------
*/

export interface CabinImage {
  id: number;
  imageUrl: string;
}

export interface Cabin {
  id: number;
  cabinName: string;
  floor: number;
  capacity: number;
  location: string;
  amenities: string[];
  status: CabinStatus;
  active: boolean;
  images: CabinImage[];
}

export type CabinStatus =
  | "AVAILABLE"
  | "OCCUPIED"
  | "MAINTENANCE";



/*
|--------------------------------------------------------------------------
| Booking
|--------------------------------------------------------------------------
*/

export type BookingStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED";

export interface Booking {
  id: number;
  cabinName: string;
  employeeName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: BookingStatus;
}

/*
|--------------------------------------------------------------------------
| Booking Request
|--------------------------------------------------------------------------
*/

export interface CreateBookingRequest {
  cabinId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

/*
|--------------------------------------------------------------------------
| Cabin Request
|--------------------------------------------------------------------------
*/

export interface UpdateCabinRequest {
  cabinName: string;
  floor: number;
  capacity: number;
  location: string;
  amenities: string[];
  status: CabinStatus;
  active: boolean;
}

/*
|--------------------------------------------------------------------------
| API Response
|--------------------------------------------------------------------------
*/

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type SlotType = "AVAILABLE" | "BOOKED";

export interface TimeSlotResponse {
  startTime: string;
  endTime: string;
  slotType: SlotType;
}

export interface BookingAvailabilityResponse {
  cabinId: number;
  cabinName: string;
  currentlyOccupied: boolean;
  occupiedUntil: string | null;
  todaySchedule: TimeSlotResponse[];
}