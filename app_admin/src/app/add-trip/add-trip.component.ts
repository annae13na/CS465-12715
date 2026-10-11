
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  public trip: Trip = new Trip();

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  public onSubmit(): void {
    this.tripDataService.addTrip(this.trip).subscribe({
      next: () => {
        alert('Trip added successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding trip:', err);
        alert('Unable to add trip.');
      }
    });
  }
}
