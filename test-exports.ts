// Test file to verify all exports are accessible
// This file demonstrates what consumers can now import from ngx-side-page

import { 
  // Service and component
  SidePageService,
  SidePageComponent,
  
  // Interfaces and types
  SidePageOption,
  SidePageConfig,
  SidePageInfo,
  SidePageRef,
  
  // Injection tokens
  SIDE_PAGE_DATA,
  SIDE_PAGE_REF,
  SIDE_PAGE_CONFIG,
  
  // Provider function
  provideSidePageConfig
} from 'ngx-side-page';

// Example usage demonstrating the fixed exports:

// 1. Global configuration (now possible with exported provideSidePageConfig)
const appConfig = {
  providers: [
    provideSidePageConfig({
      width: '400px',
      position: 'end',
      disableClose: false
    })
  ]
};

// 2. Component can inject the config token (now exported)
// @Component({...})
// class MyComponent {
//   config = inject(SIDE_PAGE_CONFIG);
// }

// 3. Service usage (was already working)
// const sidePageService = inject(SidePageService);
// const ref = sidePageService.openSidePage('key', MyComponent, options);

console.log('✅ All exports are accessible!');
export {};