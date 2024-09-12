import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {
  private isCertified = new BehaviorSubject<boolean>(false);

  setCertificationStatus(status: boolean) {
    this.isCertified.next(status);
  }

  getCertificationStatus() {
    return this.isCertified.asObservable();
  }
}
