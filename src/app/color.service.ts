import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private backgroundColorAction = new BehaviorSubject<string>('#fff')

  backgroundColor$ = this.backgroundColorAction.asObservable().pipe(
    tap(console.log),
    shareReplay(1)
  )

  changeBackgroundColor(color: string) {
    this.backgroundColorAction.next(color)
  }

}
