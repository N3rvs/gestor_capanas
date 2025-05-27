export interface Campaign {
  id?: string;
  name: string;
  platform: 'Google Ads' | 'Meta Ads';
  budget: number;
  status: 'Activa' | 'En pausa';
}
