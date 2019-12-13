import { Injectable, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CustomThemeService {
  
  render: any;

  constructor(@Inject(DOCUMENT) private document, private rendererFactory: RendererFactory2) {
    this.render = this.rendererFactory.createRenderer(null, null);
  }

  darkMode(bodyClass: string) {
    this.render.addClass(this.document.body, bodyClass);
  }

  lightMode(bodyClass: string) {
    this.render.removeClass(this.document.body, bodyClass);
  }
}
