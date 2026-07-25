import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as NurseActions from '../../../../store/nurse/nurse.actions';
import { selectAllNurses, selectNurseLoading } from '../../../../store/nurse/nurse.selectors';
import { Nurse } from '../../../../core/models/nurse.model';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-nurse-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardComponent],
  templateUrl: './nurse-profile.component.html'
})
export class NurseProfileComponent implements OnInit {
  profileForm!: FormGroup;
  nurse$!: Observable<Nurse[] | null>;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.nurse$ = this.store.select(selectAllNurses);
    this.loading$ = this.store.select(selectNurseLoading);
    
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      department: ['', Validators.required],
      licenseNumber: ['', Validators.required]
    });

    this.nurse$.subscribe(nurses => {
      if (nurses && nurses.length > 0) {
        this.profileForm.patchValue(nurses[0]);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.nurse$ && this.nurse$.subscribe) {
      this.nurse$.subscribe(nurses => {
        if (nurses && nurses.length > 0) {
          this.store.dispatch(NurseActions.updateNurse({ 
            id: nurses[0].id,
            nurse: this.profileForm.value 
          }));
        }
      }).unsubscribe();
    }
  }
}
