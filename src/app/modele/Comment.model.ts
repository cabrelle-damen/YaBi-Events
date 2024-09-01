export interface Comment {
  id: number;
  userId: number;
  content: string;
  date: Date;
  isBanned: boolean;
  banReason?: string; // Optional property for the reason the comment was banned
  isValidated?: boolean; // Optional property for validation status
}
