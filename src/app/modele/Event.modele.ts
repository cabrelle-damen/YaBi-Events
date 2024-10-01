import { Category } from "./category.model";
import { Place } from "./place.model";



export interface Event {
  _id?: string;
  name: string;
  description: string;
  category: Category; 
  subcategory: string;
  startDate: Date; 
  endDate: Date; 
  location: string;
  organizer: string;
  eventPlace: Place[];
  country: string; 
  city: string; 
  numberOfPlaces?: number;
  pricePerSeat: number; 
  imgUrl?: string;
  participants: number; 
  ticketNumber?: string; 
  startTime?: string; 
  endTime?: string; 
  isOnline?: boolean;
  isFree: boolean;

  
 
}





