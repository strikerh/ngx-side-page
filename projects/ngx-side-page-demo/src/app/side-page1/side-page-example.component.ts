import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SIDE_PAGE_DATA, SIDE_PAGE_REF, SidePageService } from 'ngx-side-page';

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
  playgroundForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private sidePageService: SidePageService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });

    this.playgroundForm = this.fb.group({
      position: ['end'],
      width: ['400px'],
      minWidth: ['250px'],
      maxWidth: ['500px'],
      zIndex: [1000],
      disableClose: [false],
      showCloseBtn: [true],
      hasBackdrop: [true],
      dataType: ['simple']
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

  // Playground methods
  getCurrentConfig() {
    const formValue = this.playgroundForm.value;
    const config: any = {};

    // Define default values
    const defaults = {
      position: 'end',
      width: '400px',
      minWidth: '250px',
      maxWidth: '500px',
      zIndex: 1000,
      disableClose: false,
      showCloseBtn: true,
      hasBackdrop: true,
      dataType: 'simple'
    };

    // Only include non-default values
    if (formValue.position !== defaults.position) {
      config.position = formValue.position;
    }
    if (formValue.width !== defaults.width) {
      config.width = formValue.width;
    }
    if (formValue.minWidth !== defaults.minWidth) {
      config.minWidth = formValue.minWidth;
    }
    if (formValue.maxWidth !== defaults.maxWidth) {
      config.maxWidth = formValue.maxWidth;
    }
    if (parseInt(formValue.zIndex) !== defaults.zIndex) {
      config.zIndex = parseInt(formValue.zIndex);
    }
    if (formValue.disableClose !== defaults.disableClose) {
      config.disableClose = formValue.disableClose;
    }
    if (formValue.showCloseBtn !== defaults.showCloseBtn) {
      config.showCloseBtn = formValue.showCloseBtn;
    }
    if (formValue.hasBackdrop !== defaults.hasBackdrop) {
      config.hasBackdrop = formValue.hasBackdrop;
    }
    if (formValue.dataType !== defaults.dataType) {
      config.dataType = formValue.dataType;
    }

    // Always include data for demonstration purposes
    config.data = this.generateSampleData(formValue.dataType);

    return config;
  }

  generateSampleData(dataType: string) {
    switch (dataType) {
      case 'simple':
        return {
          title: 'Playground Test',
          description: 'This is a test with simple data',
          type: 'playground-test',
          message: 'Hello from the playground!'
        };
      case 'complex':
        return {
          title: 'Complex Data Test',
          description: 'This test contains complex nested data',
          type: 'playground-test',
          user: {
            id: 123,
            name: 'John Doe',
            email: 'john@example.com',
            settings: {
              theme: 'dark',
              notifications: true
            }
          },
          metadata: {
            version: '1.0.0',
            lastUpdated: new Date().toISOString(),
            features: ['feature1', 'feature2', 'feature3']
          }
        };
      case 'list':
        return {
          title: 'List Data Test',
          description: 'This test contains a list of items',
          type: 'playground-test',
          items: [
            { id: 1, name: 'Item One', active: true, value: 100 },
            { id: 2, name: 'Item Two', active: false, value: 250 },
            { id: 3, name: 'Item Three', active: true, value: 375 },
            { id: 4, name: 'Item Four', active: false, value: 150 }
          ],
          totalCount: 4
        };
      case 'form':
        return {
          title: 'Form Data Test',
          description: 'This test simulates form data',
          type: 'playground-test',
          formData: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com',
            phone: '+1 (555) 123-4567',
            address: {
              street: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              zip: '90210'
            },
            preferences: {
              newsletter: true,
              notifications: false,
              theme: 'auto'
            }
          }
        };
      default:
        return { message: 'Basic playground data' };
    }
  }

  openWithCurrentConfig() {
    const formValue = this.playgroundForm.value;
    
    // Use complete configuration (including defaults) for actual side page creation
    const fullConfig = {
      position: formValue.position,
      width: formValue.width,
      minWidth: formValue.minWidth,
      maxWidth: formValue.maxWidth,
      zIndex: parseInt(formValue.zIndex),
      disableClose: formValue.disableClose,
      showCloseBtn: formValue.showCloseBtn,
      hasBackdrop: formValue.hasBackdrop,
      data: this.generateSampleData(formValue.dataType)
    };
    
    const ref = this.sidePageService.openSidePage('playground-test', SidePageExampleComponent, fullConfig);

    ref.afterClosed().subscribe(result => {
      console.log('Playground test side page closed with result:', result);
    });
  }

  resetPlayground() {
    this.playgroundForm.patchValue({
      position: 'end',
      width: '400px',
      minWidth: '250px',
      maxWidth: '500px',
      zIndex: 1000,
      disableClose: false,
      showCloseBtn: true,
      hasBackdrop: true,
      dataType: 'simple'
    });
  }
}
