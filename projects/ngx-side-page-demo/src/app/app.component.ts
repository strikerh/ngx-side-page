import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { SidePageService } from 'ngx-side-page';
import { SidePageExampleComponent } from './side-page1/side-page-example.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-side-page-demo';
  currentDirection: 'ltr' | 'rtl' = 'ltr';
  playgroundForm: FormGroup;

  constructor(private _sidePageService: SidePageService, private fb: FormBuilder) {
    // Initialize with current document direction
    this.currentDirection = (document.documentElement.getAttribute('dir') as 'ltr' | 'rtl') || 'ltr';
    
    // Make this component available globally for demo purposes
    (window as any).appComponent = this;

    // Initialize playground form
    this.playgroundForm = this.fb.group({
      position: ['end'],
      width: ['400px'],
      minWidth: ['250px'],
      maxWidth: ['500px'],
      zIndex: [1000],
      disableClose: [false],
      showCloseBtn: [true],
      hasBackdrop: [true],
      panelClass: [''],
      backdropClass: [''],
      dataType: ['simple']
    });
  }

  // Basic demo
  openSidePage() {
    const ref = this._sidePageService.openSidePage('demo', SidePageExampleComponent, {
      width: '400px',
      maxWidth: '95%',
      data: {
        title: 'Basic Demo',
        description: 'This is a basic example of the ngx-side-page component.',
        type: 'basic'
      }
    });

    ref.afterClosed().subscribe(result => {
      console.log('Side page closed with result:', result);
    });
  }

  // Position demo - left side
  openSidePageStart() {
    const ref = this._sidePageService.openSidePage('position-demo', SidePageExampleComponent, {
      position: 'start', // Left side positioning
      width: '600px',
      maxWidth: '95%',
      data: {
        title: 'Left Side Positioning',
        description: 'This demo shows how to position the side page on the left side of the screen.',
        type: 'position'
      }
    });
  }

  // Width demo - wider panel
  openSidePageWide() {
    const ref = this._sidePageService.openSidePage('width-demo', SidePageExampleComponent, {
      width: '600px',
      maxWidth: '95%',
      data: {
        title: 'Customizable Width',
        description: 'This demo shows how to customize the width of the side page.',
        type: 'width'
      }
    });
  }

  // Data passing demo
  openSidePageWithData() {
    const complexData = {
      items: [
        { id: 1, name: 'Item 1', value: 100 },
        { id: 2, name: 'Item 2', value: 200 },
        { id: 3, name: 'Item 3', value: 300 }
      ],
      user: {
        id: 123,
        name: 'John Doe',
        email: 'john@example.com'
      }
    };

    const ref = this._sidePageService.openSidePage('main_data-demo', SidePageExampleComponent, {
      width: '400px',
      maxWidth: '95%',
      data: {
        title: 'Data Passing',
        description: 'This demo shows how to pass complex main_data to the side page component.',
        type: 'data',
        complexData: complexData
      }
    });
  }

  // Events demo
  openSidePageWithEvents() {
    const ref = this._sidePageService.openSidePage('events-demo', SidePageExampleComponent, {
      width: '400px',
      maxWidth: '95%',
      data: {
        title: 'Events',
        description: 'This demo shows how to subscribe to events from the side page.',
        type: 'events'
      }
    });

    // Subscribe to events
    ref.afterOpened().subscribe(() => {
      console.log('Side page opened');
    });

    ref.afterClosed().subscribe(result => {
      console.log('Side page closed with result:', result);
      alert('Side page closed with result: ' + JSON.stringify(result));
    });
  }

  // Form example
  openFormExample() {
    const ref = this._sidePageService.openSidePage('form-example', SidePageExampleComponent, {
      width: '400px',
      maxWidth: '95%',
      data: {
        title: 'Contact Form Example',
        description: 'A contact form that demonstrates using forms in side pages.',
        type: 'form'
      }
    });
  }

  // Details view example
  openDetailsExample() {
    const ref = this._sidePageService.openSidePage('details-example', SidePageExampleComponent, {
      width: '500px',
      maxWidth: '95%',
      data: {
        title: 'Product Details',
        description: 'This example shows a product details view.',
        type: 'details',
        product: {
          id: 123,
          name: 'Premium Widget',
          price: 299.99,
          description: 'This premium widget offers unparalleled quality and performance.',
          features: [
            'High durability',
            'Advanced technology',
            'Energy efficient',
            'Sleek design'
          ],
          image: 'https://via.placeholder.com/300x200'
        }
      }
    });
  }

  // Multi-step wizard example
  openWizardExample() {
    const ref = this._sidePageService.openSidePage('wizard-example', SidePageExampleComponent, {
      width: '600px',
      maxWidth: '95%',
      data: {
        title: 'Multi-Step Wizard',
        description: 'A multi-step wizard process example.',
        type: 'wizard',
        steps: [
          { title: 'Step 1', description: 'Choose a package' },
          { title: 'Step 2', description: 'Enter your details' },
          { title: 'Step 3', description: 'Payment information' },
          { title: 'Step 4', description: 'Confirmation' }
        ]
      }
    });
  }

  // Z-Index test example
  openZIndexTest() {
    // First side page with lower z-index
    const ref1 = this._sidePageService.openSidePage('zindex-test-1', SidePageExampleComponent, {
      width: '400px',
      maxWidth: '95%',
      zIndex: 1200,
      data: {
        title: 'Z-Index Test - Layer 1',
        description: 'This side page has z-index: 1200. Click the button inside to open another with higher z-index.',
        type: 'zindex'
      }
    });
  }

  // Higher z-index side page (called from within another side page)
  openHigherZIndexTest() {
    const ref2 = this._sidePageService.openSidePage('zindex-test-2', SidePageExampleComponent, {
      width: '350px',
      maxWidth: '90%',
      zIndex: 1500,
      position: 'start',
      data: {
        title: 'Z-Index Test - Layer 2',
        description: 'This side page has z-index: 1500, so it appears above the previous one.',
        type: 'zindex-high'
      }
    });
  }

  // RTL (Right-to-Left) demo
  openRTLDemo() {
    // Temporarily set HTML to RTL for demonstration
    const htmlElement = document.documentElement;
    const originalDirection = htmlElement.getAttribute('dir') || 'ltr';
    
    // Set RTL on HTML tag
    htmlElement.setAttribute('dir', 'rtl');
    htmlElement.style.direction = 'rtl';

    const ref = this._sidePageService.openSidePage('rtl-demo', SidePageExampleComponent, {
      width: '500px',
      maxWidth: '95%',
      data: {
        title: 'RTL Support Demo',
        description: 'This demo shows how the side page automatically adapts to RTL (Right-to-Left) layouts.',
        type: 'rtl'
      }
    });

    // Restore original direction when the side page is closed
    ref.afterClosed().subscribe(() => {
      htmlElement.setAttribute('dir', originalDirection);
      htmlElement.style.direction = originalDirection;
      // Update the current direction state
      this.currentDirection = (htmlElement.getAttribute('dir') as 'ltr' | 'rtl') || 'ltr';
    });
  }

  // Global direction toggle
  toggleGlobalDirection() {
    const htmlElement = document.documentElement;
    this.currentDirection = this.currentDirection === 'ltr' ? 'rtl' : 'ltr';
    
    htmlElement.setAttribute('dir', this.currentDirection);
    htmlElement.style.direction = this.currentDirection;
  }

  // Get current direction for display
  getCurrentDirection(): string {
    return this.currentDirection.toUpperCase();
  }

  // Test disableClose option
  openDisableCloseDemo() {
    const ref = this._sidePageService.openSidePage('disable-close-demo', SidePageExampleComponent, {
      width: '400px',
      maxWidth: '95%',
      disableClose: true, // This prevents closing on backdrop/outside click
      data: {
        title: 'Disable Close Demo',
        description: 'This side page cannot be closed by clicking outside (backdrop). You must use the close button or the close methods inside the component.',
        type: 'disable-close',
        showCloseButton: true
      }
    });

    ref.afterClosed().subscribe(result => {
      console.log('Side page closed with result:', result);
    });
  }

  // Interactive playground
  openPlayground() {
    const ref = this._sidePageService.openSidePage('playground', SidePageExampleComponent, {
      width: '500px',
      maxWidth: '95%',
      position: 'end',
      data: {
        title: 'Interactive Playground',
        description: 'Try all the different options and configurations available for the side page component.',
        type: 'playground'
      }
    });

    ref.afterClosed().subscribe(result => {
      console.log('Playground closed with result:', result);
    });
  }

  // Playground methods for main page
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
    // Include panelClass and backdropClass if they have values (not empty)
    if (formValue.panelClass && formValue.panelClass.trim()) {
      config.panelClass = formValue.panelClass.trim();
    }
    if (formValue.backdropClass && formValue.backdropClass.trim()) {
      config.backdropClass = formValue.backdropClass.trim();
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
    
    const ref = this._sidePageService.openSidePage('playground-test', SidePageExampleComponent, fullConfig);

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
      panelClass: '',
      backdropClass: '',
      dataType: 'simple'
    });
  }
}
