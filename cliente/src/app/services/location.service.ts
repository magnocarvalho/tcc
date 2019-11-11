import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { retry, catchError } from 'rxjs/operators';
import { Localizacao } from '../model/localizacao';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  baseurl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='
  basePlace = 'https://maps.googleapis.com/maps/api/place/details/json?place_id='
  public location: Localizacao = new Localizacao();
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // GET
  getReverseGeocode(lan, lng): Observable<any> {
    return this.http.get<any>(this.baseurl + lan + ',' + lng + '&key=AIzaSyA1zOktcOr1AkPuG6SPT7_mOiK7Y67Z2rM')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }
  getReversePlaceDetails(place_id): Observable<any> {
    return this.http.get<any>(this.basePlace + place_id + '&key=AIzaSyA1zOktcOr1AkPuG6SPT7_mOiK7Y67Z2rM')
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      )
  }
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
        this.getReverseGeocode(this.location.latitude, this.location.longitude).subscribe(location => {
          this.onAutocompleteSelected(location.results[0], location.results)
        })
      });
    }
  }
  async getPosition() {
    if (this.location.latitude && this.location.longitude) {
      return this.location;
    } else {
      await this.setCurrentPosition()
      return this.location;
    }
  }
  onAutocompleteSelected(result: google.maps.places.PlaceResult, todos = []) {
    // console.log(todos)
    const cidade = todos.find(e => {
      return e.types.find(f => f == "locality")
    })
    const filterResponse = result.address_components.reduce((current, next) => {
      const mapKeys = {
        administrative_area_level_2: 'city',
        administrative_area_level_1: 'state',
      }
      const [validKey] = next.types.filter(key => Object.keys(mapKeys).includes(key))
      if (!validKey) return current
      return {
        ...current,
        [mapKeys[validKey]]: next.long_name
      }
    }, {})
    // console.log(cidade)
    // if (cidade) {
    //   this.getReversePlaceDetails(cidade.place_id).subscribe(res => {
    //   //  console.log(res)
    //   })
    // }
    this.location.state = filterResponse['state'];
    this.location.city = filterResponse['city'];
  }

}
