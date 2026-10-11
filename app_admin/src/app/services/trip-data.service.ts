
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  private apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) { }

 
  // GET: Retrieve all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  // GET: Retrieve one trip
  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${code}`);
  }


  // POST: Add a new trip
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  // PUT: Update an existing trip
  updateTrip(trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.apiUrl}/${trip.code}`,
      trip
    );
  }

  // DELETE: Remove a trip
  deleteTrip(code: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${code}`);
  }
}
