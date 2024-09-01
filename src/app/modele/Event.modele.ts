import { Category } from "./category.model";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: Category; // Liaison à l'objet Category
  type: 'public' | 'private';
  status: 'draft' | 'submitted';
  date: Date;
  startDate: Date; // Date de début
  endDate: Date; // Date de fin
  location: string;
  organizer: string;
  country: string; // Pays
  city: string; // Ville
  numberOfSeats: number; // Nombre de places
  pricePerSeat: number; // Coût par place
  photo: string; // Photo en base64
  participants: number; // Nombre de participants
  ticketNumber?: string; // Numéro de billet (propriété optionnelle)
  startTime?: string; // Heure de début (optionnelle)
  endTime?: string; // Heure de fin (optionnelle)
}
