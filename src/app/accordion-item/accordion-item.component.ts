import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.css'],
})
export class AccordionItemComponent implements OnInit {
  @Input() id!: string;
  @Input() label!: string;
  @ViewChild('accordionBody') body!: ElementRef;

  expanded: boolean = false;
  bodyHeight = 0;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.expanded = !this.expanded;

    if (this.expanded) {
      this.bodyHeight = this.body.nativeElement.offsetHeight;
    } else {
      this.bodyHeight = 0;
    }
  }
}
