import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/internal/Subscriber';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  private observable: Subscriber<boolean>;
  public onLoading: Observable<boolean>;


  constructor() {
    var sub: Subscriber<boolean>;
    this.onLoading = new Observable<boolean>(res => {
      this.observable = res;
    });
  }

  loading(isLoading) {
    this.observable.next(isLoading);
  }

}
