import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  public trip: Trip = new Trip();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');

    if (tripCode) {
      this.tripDataService.getTrip(tripCode).subscribe({
       next: (trip) => {
  this.trip = trip;

  if (this.trip.start) {
    this.trip.start = this.trip.start.substring(0, 10);
  }
},
        error: (err) => {
          console.error('Error loading trip:', err);
          alert('Unable to load trip.');
        }
      });
    }
  }

  public onSubmit(): void {
    this.tripDataService.updateTrip(this.trip).subscribe({
      next: () => {
        alert('Trip updated successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error updating trip:', err);
        alert('Unable to update trip.');
      }
    });
  }
}