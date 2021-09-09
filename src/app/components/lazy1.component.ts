import { Component, Input} from '@angular/core';

@Component({
  selector: 'lazy1',
  template: `
  <div [ngStyle]="{'background-color': color}">
    <h2>Background Color</h2>
    <input [(ngModel)]="color" type="text"/>
  </div>
  `
})
export class Lazy1Component {
  @Input() color!: string
}
