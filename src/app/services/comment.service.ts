import { Injectable } from '@angular/core';
import { Comment } from '../modele/Comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private comments: Comment[] = [
    { id: 1, userId: 101, content: "This is a great event!", date: new Date(), isBanned: false },
    { id: 2, userId: 102, content: "This is a racist comment", date: new Date(), isBanned: false },
    { id: 3, userId: 103, content: "I love this!", date: new Date(), isBanned: false }
  ];

  constructor() {}

  getComments(): Comment[] {
    return this.comments;
  }

  banComment(id: number, reason: string): void {
    const comment = this.comments.find(c => c.id === id);
    if (comment) {
      comment.isBanned = true;
      comment.banReason = reason;
      console.log(`Comment with ID ${id} has been banned for the following reason: ${reason}`);
    }
  }

  validateComment(id: number): void {
    const comment = this.comments.find(c => c.id === id);
    if (comment) {
      comment.isValidated = true;
    }
  }
}
