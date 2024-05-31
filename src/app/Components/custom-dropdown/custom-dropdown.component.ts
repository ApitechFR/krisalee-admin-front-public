import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss']
})
export class CustomDropdownComponent implements OnInit {
@Input() items: any[];

  show:boolean = false;

  selectedItem : string;

    // @Output() ajouter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.selectedItem = this.items[0];
    console.log(this.items);
  }

  open(){
    this.show = !this.show;
  }

  choose(item: string){
    this.selectedItem = item
    this.show = false;
  }

}
