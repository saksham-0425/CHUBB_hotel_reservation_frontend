export interface CreateBookingRequest {
  hotelId: number;
  roomCategoryId: number;
  guestName: string;
  numberOfGuests: number;
  numberOfRooms: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface BookingResponse {
  bookingId: number;
  bookingReference: string;
  status: string;
  guestName: string;
  numberOfGuests: number;
  numberOfRooms: number;
  hotelId: number;
  roomCategoryId: number;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
}
