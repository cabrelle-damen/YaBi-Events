import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface TicketItem {
  type: string;
  content?: string;
  url?: string;
  qrCodeContent?: string;
  width?: number;
  height?: number;
  position: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  scale?: { x: number; y: number; z: number };
}

@Component({
  selector: 'app-taxsreport',
  templateUrl: './taxsreport.component.html',
  styleUrls: ['./taxsreport.component.css'],
})
export class TaxsreportComponent implements OnInit {
  ticketContent: TicketItem[] = [];
  selectedItem?: TicketItem;
  @ViewChild('ticketArea', { static: false }) ticketArea!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  addComponent(type: string) {
    const newComponent: TicketItem = {
      type: type,
      content: type === 'text' ? 'Texte à éditer' : '',
      qrCodeContent: type === 'qr-code' ? this.generateQRCode() : '',
      position: { x: 10, y: 10, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
      width: type === 'image' ? 100 : undefined,
      height: type === 'image' ? 100 : undefined,
    };
    this.ticketContent.push(newComponent);
    this.selectedItem = newComponent;
  }

  onDragEnd(event: any, item: TicketItem) {
    const offset = this.ticketArea.nativeElement.getBoundingClientRect();
    item.position.x = event.clientX - offset.left;
    item.position.y = event.clientY - offset.top;
  }

  selectItem(item: TicketItem) {
    this.selectedItem = item;
  }

  deleteItem(item: TicketItem) {
    const index = this.ticketContent.indexOf(item);
    if (index > -1) {
      this.ticketContent.splice(index, 1);
    }
    this.selectedItem = undefined;
  }

  onLogoSelect(item: TicketItem) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          if (event.target && event.target.result) {
            const img = new Image();
            img.src = event.target.result as string;
            img.onload = () => {
              const maxSize = 200;
              let newWidth = img.width;
              let newHeight = img.height;

              if (newWidth > maxSize || newHeight > maxSize) {
                if (newWidth > newHeight) {
                  newHeight = (newHeight * maxSize) / newWidth;
                  newWidth = maxSize;
                } else {
                  newWidth = (newWidth * maxSize) / newHeight;
                  newHeight = maxSize;
                }
              }

              item.url = event.target.result as string;
              item.width = newWidth;
              item.height = newHeight;
            };
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  generateQRCode(): string {
    return 'QRCode-' + new Date().getTime();
  }

  onTextChange(event: any, item: TicketItem) {
    item.content = event.target.value;
  }

  saveTemplate() {
    const data = JSON.stringify(this.ticketContent);
    localStorage.setItem('ticket-template', data);
  }

  loadTemplate() {
    const data = localStorage.getItem('ticket-template');
    if (data) {
      this.ticketContent = JSON.parse(data);
    }
  }

  // Ajout de la fonctionnalité de capture et téléchargement
  downloadTicketAsImage() {
    html2canvas(this.ticketArea.nativeElement).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement('a');
      link.download = 'ticket.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  downloadTicketAsPDF() {
    html2canvas(this.ticketArea.nativeElement).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // Largeur A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('ticket.pdf');
    });
  }
}
