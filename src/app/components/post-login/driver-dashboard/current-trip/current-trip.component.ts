import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'leaflet';
import { Observable, switchMap } from 'rxjs';
import { IDriver } from 'src/app/interface/IDriver';
import { ITrip } from 'src/app/interface/ITrip';
import { IResponse } from 'src/app/interface/IResponse';
import { DriverService } from 'src/app/services/driver/driver.service';
import { MapService } from 'src/app/services/map/map.service';
import { StorageService } from 'src/app/services/storage.service';
import { showError } from 'src/app/utility/helper';

@UntilDestroy()
@Component({
  selector: 'app-current-trip',
  templateUrl: './current-trip.component.html',
  styleUrls: ['./current-trip.component.scss'],
})
export class CurrentTripComponent implements OnInit {
  protected driver: IDriver;

  protected trip: ITrip;
  protected pickUpLocation:string;
  protected dropOffLocation:string;

  constructor(
    private service: DriverService,
    private storage: StorageService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    this.driver = this.storage.get('driver-data') as unknown as IDriver;
    this.loadCurrentTrip();
  }

  loadCurrentTrip() {
    this.service
      .ongoingTripWithId(this.driver.id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: IResponse) => {
          this.trip = res.data;
          this.getPickUpLocation();
          this.getDropOffLocation();
        },
        error: () => {
          showError({
            title: 'Ongoing Trips',
            text: 'You have not any ongoing trips',
          });
        },
      });
  }

  protected getPickUpLocation(){
     this.mapService
      .getAddress(this.trip.pickupLatitude, this.trip.pickupLongitude)
      .pipe(
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
          this.pickUpLocation = res.display_name;
        },
        error: () => {
          showError({
            title: 'System Error',
            text: 'Location Fetching Failed.Try Again Later',
          });
        },
      })
  }

  protected getDropOffLocation(){
     this.mapService
      .getAddress(this.trip.dropLatitude, this.trip.dropLongitude)
      .pipe(
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
          this.dropOffLocation = res.display_name;
        },
        error: () => {
          showError({
            title: 'System Error',
            text: 'Location Fetching Failed.Try Again Later',
          });
        },
      })
  }

  getGoogleMapsUrl(): string {
    const { pickupLongitude, pickupLatitude, dropLatitude, dropLongitude } =
      this.trip;
    return `https://www.google.com/maps/dir/?api=1&origin=${pickupLongitude},${pickupLatitude}&destination=${dropLatitude},${dropLongitude}`;
  }
}
