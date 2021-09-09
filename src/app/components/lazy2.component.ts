import {
  Component,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnInit,
  Input,
  OnDestroy
} from '@angular/core';
import { ColorService } from '../color.service';
import { Lazy2aComponent } from './lazy2a.component';
import { Lazy2bComponent } from './lazy2b.component';

@Component({
  selector: 'lazy2',
  template: `
    <p>lazy2 component</p>
    color: {{ color }}
  `
})
export class Lazy2Component implements OnInit, OnDestroy {
  @Input() color!: string
  colors = ['#333', '#ff0000']
  isFirst = true
  interval: any

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private col: ColorService
  ) {}


  ngOnInit() {
    const componentFactorya = this.cfr.resolveComponentFactory(Lazy2aComponent);
    const componentFactoryb = this.cfr.resolveComponentFactory(Lazy2bComponent);
    this.viewContainerRef.createComponent(componentFactorya);
    this.viewContainerRef.createComponent(componentFactoryb);

    this.interval = setInterval(() => {
      this.swithColor()
      if(this.isFirst) {
        this.col.changeBackgroundColor(this.colors[0])
      } else {
        this.col.changeBackgroundColor(this.colors[1])
      }
    }, 2000)
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
   }
  }

  swithColor() {
    this.isFirst = !this.isFirst
  }
}