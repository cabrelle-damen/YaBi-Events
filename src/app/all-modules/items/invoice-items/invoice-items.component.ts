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
  commentToBan: number | null = null;
  showBanModal: boolean = false; // Contrôle l'affichage de la modale pour le bannissement
  successMessage: string = ''; // Message de succès
  errorMessage: string = ''; // Message d'erreur si la raison n'est pas fournie

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.comments = this.commentService.getComments().map(comment => ({
      ...comment,
      status: 'en attente' // Ajout du statut par défaut
    }));
  }

  // Méthode pour ouvrir la modale de bannissement
  banComment(commentId: number): void {
    this.commentToBan = commentId;
    this.showBanModal = true;
    this.errorMessage = ''; // Réinitialise le message d'erreur lorsque la modale est ouverte
  }

  // Méthode pour confirmer le bannissement
  confirmBanComment(): void {
    if (this.commentToBan !== null && this.banReason.trim()) {
      this.commentService.banComment(this.commentToBan, this.banReason);
      const commentIndex = this.comments.findIndex(comment => comment.id === this.commentToBan);
      if (commentIndex > -1) {
        this.comments[commentIndex].status = 'banni'; // Mise à jour du statut
      }
      this.banReason = ''; // Réinitialise la raison après le bannissement
      this.commentToBan = null; // Réinitialise l'ID du commentaire
      this.showBanModal = false; // Ferme la modale
      this.successMessage = 'Le commentaire a été banni avec succès.';
      
      // Efface le message de succès après 3 secondes
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      this.errorMessage = 'La raison du bannissement est obligatoire.';
    }
  }

  // Méthode pour valider un commentaire
  validateComment(commentId: number): void {
    const commentIndex = this.comments.findIndex(comment => comment.id === commentId);
    if (commentIndex > -1) {
      this.comments[commentIndex].status = 'valide'; // Mise à jour du statut
    }
    this.successMessage = 'Le commentaire a été validé avec succès.';
    
    // Efface le message après 3 secondes
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  // Méthode pour fermer la modale sans bannir
  cancelBan(): void {
    this.showBanModal = false;
    this.banReason = '';
    this.commentToBan = null;
    this.errorMessage = ''; // Réinitialise le message d'erreur
  }
}
