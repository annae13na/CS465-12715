
import { Component, Input } from '@angular/core';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;

  constructor(private tripDataService: TripDataService) {}

  public deleteTrip(): void {
    const confirmed = confirm(
      `Are you sure you want to delete ${this.trip.name}?`
    );

    if (!confirmed) {
      return;
    }

    this.tripDataService.deleteTrip(this.trip.code).subscribe({
      next: () => {
        alert('Trip deleted successfully!');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error deleting trip:', err);
        alert('Unable to delete trip.');
      }
    });
  }
}
