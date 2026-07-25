import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-select",
    standalone: true,
    imports:[CommonModule, FormsModule],
    templateUrl:"./select.component.html"
})
export class SelectComponent implements OnInit{
    @Input() label: string = '';
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() cssClass: string = '';
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Input() options: any[] = [];  
    @Input() value: string = ''; 
    @Input() path: String  = '';

    @Output() valueChange = new EventEmitter<string>();
    @Output() selectedValue = new EventEmitter<string>();

    selectedOption: string = '';

    ngOnInit(): void {
        this.selectedOption = this.value;
    }

    onSelectionChange(event: any) {
        const value = event.target.value;
        this.selectedOption = value;
        this.valueChange.emit(value);
        this.selectedValue.emit(value);
    }
}