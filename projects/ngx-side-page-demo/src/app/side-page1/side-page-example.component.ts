import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SIDE_PAGE_DATA, SIDE_PAGE_REF } from 'ngx-side-page';

@Component({
  selector: 'app-side-page-example',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-page-example.component.html',
  styleUrl: './side-page-example.component.scss'
})
export class SidePageExampleComponent implements OnInit {
  public main_data = inject(SIDE_PAGE_DATA);
  public main_ref = inject(SIDE_PAGE_REF);
  public data: any = this.main_data.data
  currentStep = 0;
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

  }

  ngOnInit() {
    console.log('Side page main_data:', this.main_data);
  }

  closeWithResult(result: any) {
    // This would be handled by the side page service
    this.main_ref.close();
    console.log('Closing with result:', result);
  }

  // For the wizard example
  nextStep() {
    if (this.main_data.data.steps && this.currentStep < this.main_data.data.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  submitForm() {
    this.submitted = true;

    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.closeWithResult(this.contactForm.value);
    }
  }

  // Helper function to check if a form control is invalid and touched
  isInvalid(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control?.invalid && (control?.touched || this.submitted);
  }
}
