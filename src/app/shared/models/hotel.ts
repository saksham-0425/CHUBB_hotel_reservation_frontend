export interface Hotel {
  id: number;
  name: string;
  city: string;
  address: string;
  description?: string;
  managerEmail?: string;
  amenities: string[];
  roomCategories?: RoomCategory[];
}

export interface RoomCategory {
  id: number;
  category: string;
  totalRooms: number;
  capacity: number;
  basePrice: number;
}
