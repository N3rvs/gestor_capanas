import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Campaign } from '../../models/campaign.model';

@Injectable({ providedIn: 'root' })
export class CampaignsService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  getUserCampaigns(): Observable<Campaign[]> {
    const user = this.auth.currentUser;
    if (!user) return of([]);

    const campaignsRef = collection(this.firestore, `campaigns/${user.uid}/items`);
    return collectionData(campaignsRef, { idField: 'id' }) as Observable<Campaign[]>;
  }
}
