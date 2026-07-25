import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() config: any;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  formGroup!: FormGroup;
  isSubmitting = false;
  groupedFields: any[][] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.groupFields();
  }

  buildForm() {
    const group: any = {};
    
    if (this.config && this.config.fields) {
      this.config.fields.forEach((field: any) => {
        const validators = [];
        if (field.required) {
          validators.push(Validators.required);
        }
        if (field.type === 'email') {
          validators.push(Validators.email);
        }
        
        const defaultValue = field.defaultValue || '';
        group[field.key] = [defaultValue, validators];
      });
    }
    
    this.formGroup = this.fb.group(group);
  }

  groupFields() {
    if (!this.config || !this.config.fields) return;
    
    const rows: any[][] = [];
    let currentRow: any[] = [];
    let currentRowGroup: number | null = null;
    
    this.config.fields.forEach((field: any, index: number) => {
     
      if (field.type === 'hidden') {
        return;
      }
      
      const fieldRowGroup = field.rowGroup !== undefined ? field.rowGroup : index;
      
      
      if (currentRowGroup !== null && fieldRowGroup !== currentRowGroup) {
        if (currentRow.length > 0) {
          rows.push(currentRow);
          currentRow = [];
        }
      }
      
      currentRow.push(field);
      currentRowGroup = fieldRowGroup;
      
     
      if (field.rowGroup === undefined) {
        rows.push(currentRow);
        currentRow = [];
        currentRowGroup = null;
      }
    });
    
    
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    this.groupedFields = rows;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isSubmitting = true;
      this.formSubmit.emit(this.formGroup.value);
      
      setTimeout(() => {
        this.isSubmitting = false;
      }, 1000);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onCancel() {
    this.formCancel.emit();
  }

  getFieldError(fieldKey: string): string {
    const control = this.formGroup.get(fieldKey);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'This field is required';
      }
      if (control.errors['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }
}
