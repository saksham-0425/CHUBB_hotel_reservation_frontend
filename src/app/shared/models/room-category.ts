export interface RoomCategory {
  id?: number;          // optional for create
  category: string;
  totalRooms: number;
  capacity: number;
  basePrice: number;
}