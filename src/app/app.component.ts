import { Component, ComponentFactoryResolver, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ColorService } from './color.service';

@Component({
  selector: 'app-root',
  template: `
  <div>
  <p>{{ summary }}</p>
    <div>Hello World! This is the {{ title }} app.</div>
    <lazy1 *ngFor="let n of time" [color]="bgColor$ | async"></lazy1>
    <button (click)='getLazy2()'>lazy 2</button>
    <button (click)='remove()'>remove lazy 2</button>
  </div>
  `,
  styles: []
})
export class AppComponent implements OnDestroy {
  title = 'lazy-comp';
  bgColor$ = this.colorService.backgroundColor$
  sub?: Subscription
  time = Array(5)

  summary: string[] = []

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    public colorService: ColorService
  ) {}

  async getLazy2() {
    this.viewContainerRef.clear();
    const { Lazy2Component } = await import('./components/lazy2.component');
    const componentRef = this.viewContainerRef.createComponent(
      this.cfr.resolveComponentFactory(Lazy2Component)
    );

    this.sub = this.bgColor$.subscribe((color: string) => {
      componentRef.instance.color = color
      this.summary = [...this.summary, color]
    })
  }

  remove() {
    this.viewContainerRef.clear();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe()
  }
}
