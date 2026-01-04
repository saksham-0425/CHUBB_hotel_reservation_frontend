import { RoomCategory } from './room-category';

export interface AdminHotel {
  id?: number;
  name: string;
  city: string;
  address: string;
  description?: string;
  managerEmail: string;
  amenities: string[];
  roomCategories: RoomCategory[];
}
