import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidePageService } from 'ngx-side-page';
import { SidePageExampleComponent } from './side-page1/side-page-example.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ngx-side-page-demo';

  constructor(private _sidePageService: SidePageService) {}

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
}
