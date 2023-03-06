export default interface IRoom {
    name: string;
    roomType: string;
    price: number;
    floor: number;
    capacity: number;
    amenities: string[];
    booked: boolean
}