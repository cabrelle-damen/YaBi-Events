import { Category } from "./category.model";
import { Place } from "./place.model";



export interface Event {
  id: string;
  name: string;
  description: string;
  category: Category; // Liaison à l'objet Category
  type: 'public' | 'private';
  status: 'draft' | 'submitted';
  date: Date;
  startDate: Date; // Date de début
  endDate: Date; // Date de fin
  location: string;
  organizer: string;
  eventPlace: Place[];
  country: string; // Pays
  city: string; // Ville
  numberOfPlaces?: number;
  pricePerSeat: number; // Coût par place
  imgUrl?: string;
  participants: number; // Nombre de participants
  ticketNumber?: string; // Numéro de billet (propriété optionnelle)
  startTime?: string; // Heure de début (optionnelle)
  endTime?: string; // Heure de fin (optionnelle)
  isOnline?: boolean;
  isFree: boolean;
}
