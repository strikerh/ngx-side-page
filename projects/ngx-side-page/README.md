# ngx-side-page

[![npm version](https://badge.fury.io/js/ngx-side-page.svg)](https://badge.fury.io/js/ngx-side-page)
[![npm downloads](https://img.shields.io/npm/dm/ngx-side-page.svg)](https://www.npmjs.com/package/ngx-side-page)
[![GitHub](https://img.shields.io/github/license/strikerh/ngx-side-page)](https://github.com/strikerh/ngx-side-page/blob/master/LICENSE)

A versatile Angular library for creating and managing side pages (slide-out panels) with ease. This library provides a service-based approach to display components in slide-out panels with smooth animations, similar to Angular Material's dialog system but specifically designed for side panels.

## 🚀 Live Demo

**Try it now:** [https://strikerh.github.io/ngx-side-page/](https://strikerh.github.io/ngx-side-page/)

See the library in action with interactive examples showcasing all features including animations, positioning, data passing, and more!

## Links

- � **[Live Demo](https://strikerh.github.io/ngx-side-page/)** - Try it now!
- �📦 [NPM Package](https://www.npmjs.com/package/ngx-side-page)
- 🔗 [GitHub Repository](https://github.com/strikerh/ngx-side-page)
- � [Documentation](https://github.com/strikerh/ngx-side-page#readme)

## Features

- 🚀 **Easy Integration** - Simple service-based API
- 🎨 **Smooth Animations** - Built-in slide animations with RTL support
- 📱 **Responsive Design** - Configurable width, min-width, and max-width
- 🎯 **Flexible Positioning** - Support for both left (`start`) and right (`end`) positioning
- 💾 **Data Passing** - Pass data to and from side page components
- 🔄 **Event Handling** - Subscribe to open, close, and backdrop click events
- ⚙️ **Global Configuration** - Set default options for all side pages
- 🎭 **Custom Styling** - Customizable panel and backdrop classes
- 🔒 **Prevent Close** - Optional disable close functionality
- 🌍 **RTL Support** - Automatic RTL direction detection and animation adjustment

## Requirements

- Angular 15.0.0 or higher
- @angular/common 15.0.0 or higher
- @angular/core 15.0.0 or higher

## Setup

### 1. Install the package

```bash
npm install ngx-side-page
```

> 🎯 **Try before you install:** Check out the [live interactive demo](https://strikerh.github.io/ngx-side-page/) to see all features in action!

### 2. Configure animations (Required)

Add `provideAnimationsAsync()` to your application configuration:

```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    provideAnimationsAsync(), // Required for ngx-side-page animations
    // ... other providers
  ]
};
```

**Note:** The library uses Angular animations for smooth slide-in/slide-out effects. The `provideAnimationsAsync()` provider is required for proper functionality.

---

## 🎯 **Quick Start Guide**

**Want to see it in action first?** 
👉 **[Open the Live Demo](https://strikerh.github.io/ngx-side-page/)** 👈

The demo shows all features including animations, positioning, data passing, forms, and customization options. Perfect for understanding how the library works before integration!

---

## Basic Usage

> 🎮 **Interactive Examples**: All code examples below are running live in the [demo](https://strikerh.github.io/ngx-side-page/). Click to see them in action!

### 1. Import the Service

```typescript
import { Component, inject } from '@angular/core';
import { SidePageService } from 'ngx-side-page';
import { YourSidePageComponent } from './your-side-page.component';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="openSidePage()">Open Side Page</button>
  `
})
export class AppComponent {
  private sidePageService = inject(SidePageService);

  openSidePage() {
    const ref = this.sidePageService.openSidePage(
      'unique-key', 
      YourSidePageComponent,
      {
        width: '400px',
        position: 'end',
        data: { message: 'Hello from parent!' }
      }
    );

    // Listen to close event
    ref.afterClosed().subscribe(result => {
      console.log('Side page closed with:', result);
    });
  }
}
```

### 2. Create Your Side Page Component

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { SIDE_PAGE_DATA, SIDE_PAGE_REF, SidePageRef } from 'ngx-side-page';

@Component({
  selector: 'app-your-side-page',
  standalone: true,
  template: `
    <div class="p-4">
      <h2>{{ data.message }}</h2>
      <button (click)="close('result data')">Close</button>
    </div>
  `
})
export class YourSidePageComponent implements OnInit {
  data = inject(SIDE_PAGE_DATA);
  ref = inject(SIDE_PAGE_REF);

  ngOnInit() {
    console.log('Received data:', this.data);
  }

  close(result?: any) {
    this.ref.close(result);
  }
}
```

## Configuration Options

### SidePageOption Interface

```typescript
interface SidePageOption {
  key?: string;                    // Unique identifier
  position?: 'end' | 'start';      // Panel position (end = right, start = left)
  disableClose?: boolean;          // Prevent closing on backdrop click
  showCloseBtn?: boolean;          // Show/hide close button
  width?: string;                  // Panel width
  maxWidth?: string;               // Maximum width
  minWidth?: string;               // Minimum width
  panelClass?: string;             // Custom CSS class for panel
  backdropClass?: string;          // Custom CSS class for backdrop
  hasBackdrop?: boolean;           // Show/hide backdrop
  zIndex?: number;                 // Z-index for layering
  data?: any;                      // Data to pass to component
}
```

### Global Configuration

Configure default options for all side pages:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideSidePageConfig } from 'ngx-side-page';

bootstrapApplication(AppComponent, {
  providers: [
    provideSidePageConfig({
      width: '500px',
      maxWidth: '90vw',
      minWidth: '300px',
      position: 'end',
      disableClose: false
    }),
    // ... other providers
  ]
});
```

## Advanced Usage Examples

> 💡 **See these examples in action:** Visit the [live demo](https://strikerh.github.io/ngx-side-page/) to interact with all these examples!

### Left-Side Panel

```typescript
openLeftPanel() {
  const ref = this.sidePageService.openSidePage('left-panel', MyComponent, {
    position: 'start',  // Opens from left side
    width: '350px',
    maxWidth: '80vw'
  });
}
```

### Prevent Closing

```typescript
openNonClosablePanel() {
  const ref = this.sidePageService.openSidePage('secure-panel', MyComponent, {
    disableClose: true,    // Prevents backdrop click close
    showCloseBtn: false,   // Hides close button
    data: { readonly: true }
  });
}
```

### Custom Styling

```typescript
openStyledPanel() {
  const ref = this.sidePageService.openSidePage('styled-panel', MyComponent, {
    panelClass: 'my-custom-panel',
    backdropClass: 'my-custom-backdrop',
    zIndex: 2000
  });
}
```

```css
/* Custom styles */
.my-custom-panel {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px 0 0 8px;
}

.my-custom-backdrop {
  background-color: rgba(0, 0, 0, 0.8);
}
```

### Complex Data Passing

```typescript
openDataPanel() {
  const complexData = {
    user: { id: 123, name: 'John Doe' },
    settings: { theme: 'dark', lang: 'en' },
    items: [1, 2, 3, 4, 5]
  };

  const ref = this.sidePageService.openSidePage('data-panel', MyComponent, {
    data: complexData,
    width: '600px'
  });

  // Handle result
  ref.afterClosed().subscribe(result => {
    if (result) {
      console.log('User submitted:', result);
      // Handle the returned data
    }
  });
}
```

## API Reference

### SidePageService

#### Methods

- **`openSidePage<T>(key: string, component: T, options?: SidePageOption): SidePageRef<T>`**
  - Opens a new side page with the specified component
  - Returns a reference to control the side page

- **`closeSidePage(key: string, value?: any): void`**
  - Closes a specific side page by its key

- **`closeLastSidePage(value?: any): void`**
  - Closes the most recently opened side page

- **`getSidePage(): Observable<SidePageInfo[]>`**
  - Returns an observable of all currently open side pages

### SidePageRef

#### Properties

- **`key: string`** - Unique identifier of the side page
- **`componentInstance: T`** - Reference to the component instance
- **`options: SidePageOption`** - Configuration options used
- **`openedSidePages: SidePageInfo[]`** - Array of all open side pages

#### Methods

- **`close(value?: any): void`** - Closes this side page
- **`afterClosed(): Observable<any>`** - Emits when side page closes
- **`afterOpened(): Observable<void>`** - Emits when side page opens
- **`beforeClosed(): Observable<any>`** - Emits before side page closes
- **`getState(): boolean`** - Returns current open/closed state

### Injection Tokens

- **`SIDE_PAGE_DATA`** - Inject data passed to the side page component
- **`SIDE_PAGE_REF`** - Inject reference to control the side page
- **`SIDE_PAGE_CONFIG`** - Inject global configuration

## Form Example

Here's a complete example of using a form in a side page:

> 📝 **Live Form Demo**: See this exact form example working in the [interactive demo](https://strikerh.github.io/ngx-side-page/) - try submitting data and seeing the results!

```typescript
// Parent Component
openContactForm() {
  const ref = this.sidePageService.openSidePage('contact-form', ContactFormComponent, {
    width: '400px',
    maxWidth: '95vw',
    data: { 
      title: 'Contact Us',
      prefillData: { name: 'John', email: 'john@example.com' }
    }
  });

  ref.afterClosed().subscribe(formData => {
    if (formData) {
      console.log('Form submitted:', formData);
      this.saveContactForm(formData);
    }
  });
}

// Contact Form Component
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-4">{{ data.title }}</h2>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <div class="mb-4">
          <label class="block mb-2">Name</label>
          <input formControlName="name" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2">Email</label>
          <input formControlName="email" type="email" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block mb-2">Message</label>
          <textarea formControlName="message" class="w-full p-2 border rounded h-24"></textarea>
        </div>
        <div class="flex gap-2">
          <button type="submit" [disabled]="contactForm.invalid" 
                  class="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
          <button type="button" (click)="cancel()" 
                  class="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `
})
export class ContactFormComponent implements OnInit {
  data = inject(SIDE_PAGE_DATA);
  ref = inject(SIDE_PAGE_REF);
  
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Prefill form if data provided
    if (this.data.prefillData) {
      this.contactForm.patchValue(this.data.prefillData);
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.ref.close(this.contactForm.value);
    }
  }

  cancel() {
    this.ref.close(null);
  }
}
```

## Styling and Theming

The library uses minimal CSS and relies on CSS classes for positioning and animations. You can customize the appearance using:

### Default Classes

- `.overlay` - Backdrop overlay
- `.fixed`, `.top-0`, `.bottom-0` - Panel positioning
- `.bg-white`, `.shadow-lg` - Panel styling

### Custom CSS Variables

```css
:root {
  --side-page-backdrop-color: rgba(0, 0, 0, 0.5);
  --side-page-animation-duration: 300ms;
  --side-page-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}
```

## RTL Support

The library automatically detects RTL direction from `document.documentElement` computed styles and adjusts animations accordingly. No additional configuration is required.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest) 
- Safari (latest)
- IE 11+ (with polyfills)

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our GitHub repository.

- 🎮 [Try Live Demo](https://strikerh.github.io/ngx-side-page/) - Test the library first
- 🐛 [Report Issues](https://github.com/strikerh/ngx-side-page/issues)
- 💡 [Request Features](https://github.com/strikerh/ngx-side-page/issues/new?template=feature_request.md)
- 🔀 [Submit Pull Requests](https://github.com/strikerh/ngx-side-page/pulls)

## Repository

- **GitHub**: [https://github.com/strikerh/ngx-side-page](https://github.com/strikerh/ngx-side-page)
- **NPM**: [https://www.npmjs.com/package/ngx-side-page](https://www.npmjs.com/package/ngx-side-page)
- **Author**: Hazem Safwat
- **License**: MIT

## Installation

```bash
npm install ngx-side-page
```

## License

MIT License - see the [LICENSE](https://github.com/strikerh/ngx-side-page/blob/master/LICENSE) file for details.

MIT License - see LICENSE file for details.

## Author

Created by **Hazem Safwat**

---

For more examples and advanced usage, check out the demo application included in this repository.
