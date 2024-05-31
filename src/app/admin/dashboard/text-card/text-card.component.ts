import { HtmlParser } from '@angular/compiler';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-text-card',
  styleUrls: ['./text-card.component.scss'],
  templateUrl: './text-card.component.html',
})
export class TextCardComponent
{
  @Input() content: HtmlParser;
  @Input() type: string;

  constructor(private router: Router) {}

  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'STRONG') {
      const text = target.innerText.toLowerCase();
      switch (text) {
        case 'services':
          this.router.navigate(['/', 'admin','config','admin-services']);
          break;
        case 'connecteurs':
          this.router.navigate(['/', 'admin','config','data-importation']);
          break;
        case 'utilisateurs':
          this.router.navigate(['/', 'admin','config','admin-users']);
          break;
        default:
          break;
      }
    }
  }
}
