import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CampaignsService } from '../../core/services/campaigns.service';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    TagModule
  ],
  template: `
    <div class="p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <p-card header="Campañas Activas" styleClass="text-center">
          <h2 class="text-3xl font-bold">{{ campaigns.length }}</h2>
        </p-card>
        <p-card header="Presupuesto Total" styleClass="text-center">
          <h2 class="text-3xl font-bold">€{{ getTotalBudget() }}</h2>
        </p-card>
        <p-card header="Meta Clicks" styleClass="text-center">
          <h2 class="text-3xl font-bold">-</h2> 
        </p-card>
      </div>

      <p-card header="Listado de campañas">
        <p-table [value]="campaigns" responsiveLayout="scroll">
          <ng-template pTemplate="header">
            <tr>
              <th>Nombre</th>
              <th>Plataforma</th>
              <th>Presupuesto</th>
              <th>Estado</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-camp>
            <tr>
              <td>{{ camp.name }}</td>
              <td>{{ camp.platform }}</td>
              <td>€{{ camp.budget }}</td>
              <td>
                <p-tag [value]="camp.status" [severity]="camp.status === 'Activa' ? 'success' : 'warning'"/>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </p-card>
    </div>
  `
})
export class DashboardComponent {
  campaigns: Campaign[] = [];

  constructor(private campaignsService: CampaignsService) {
    this.campaignsService.getUserCampaigns().subscribe(data => {
      this.campaigns = data;
    });
  }

  getTotalBudget(): number {
    return this.campaigns.reduce((total, c) => total + c.budget, 0);
  }
}
