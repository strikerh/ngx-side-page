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
    console.log('Data type:', this.main_data?.data?.type);
  }

  closeWithResult(result: any) {
    // This would be handled by the side page service
    console.log('Closing with result:', result);
    this.main_ref.close(result);
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

  // RTL Demo methods
  toggleDirection(direction: 'ltr' | 'rtl') {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('dir', direction);
    htmlElement.style.direction = direction;
  }

  getCurrentDirection(): string {
    const htmlElement = document.documentElement;
    const dir = htmlElement.getAttribute('dir') || 'ltr';
    return dir.toUpperCase();
  }

  // Open higher z-index layer for z-index demo
  openHigherLayer() {
    // We need to inject the parent app component method
    // For demo purposes, we'll use a simple approach
    if ((window as any).appComponent && (window as any).appComponent.openHigherZIndexTest) {
      (window as any).appComponent.openHigherZIndexTest();
    }
  }
}
