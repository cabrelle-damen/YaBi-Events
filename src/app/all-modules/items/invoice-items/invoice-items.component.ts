import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/modele/Comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-invoice-items',
  templateUrl: './invoice-items.component.html',
  styleUrls: ['./invoice-items.component.css']
})
export class InvoiceItemsComponent implements OnInit {

  comments: Comment[] = [];
  banReason: string = '';

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.comments = this.commentService.getComments();
  }

  banComment(commentId: number): void {
    this.commentService.banComment(commentId, this.banReason);
    this.banReason = ''; // Clear the reason input after banning
  }

  validateComment(commentId: number): void {
    this.commentService.validateComment(commentId);
  }
}
