import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [],
  templateUrl: "./input.component.html"
})
export class InputComponent {

  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() cssClass: String = '';
  @Output() messageEvent = new EventEmitter<string>();

  updateValue(value: string) {
    this.messageEvent.emit(value);
  }
}