# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [18.0.64] - 2025-01-07

### Added
- **Body overflow control**: Side pages now automatically manage body overflow to prevent background scrolling when a side page is open
- **Improved event handling**: Enhanced afterClosed() method with proper Observable completion using `take(1)` operator
- **TailwindCSS integration**: Added TailwindCSS support to the demo project for better styling capabilities
- **Enhanced demo application**: Complete redesign of the demo application with:
  - Professional landing page design
  - Multiple interactive examples showcasing different features
  - Comprehensive documentation section
  - Feature showcase with practical examples
  - Responsive design for mobile and desktop

### Changed
- **Service refactoring**: Improved SidePageService with better type safety and cleaner code structure
  - Removed unnecessary Observable completions that were causing issues
  - Enhanced interface definitions for better TypeScript support
  - Improved constructor parameter handling
- **Animation provider**: Added `provideAnimationsAsync()` to application configuration for better performance
- **Code cleanup**: Removed unused imports and improved code organization in the side page service

### Fixed
- **Memory leaks**: Fixed potential memory leaks by properly handling Observable subscriptions
- **Event completion**: Fixed issues with Observable completion in closing and opening events
- **Type safety**: Improved TypeScript definitions and interfaces

### Technical Improvements
- **Dependencies**: Updated and added new development dependencies:
  - Added `autoprefixer` v10.4.21
  - Added `postcss` v8.5.6  
  - Added `tailwindcss` v3.4.17
- **Build process**: Enhanced build configuration with PostCSS and Tailwind integration
- **Demo enhancements**: 
  - Complete UI/UX overhaul with modern design patterns
  - Interactive feature demonstrations
  - Real-world usage examples
  - Professional documentation layout

### Demo Features Added
- **Positioning examples**: Demonstrations of left/right side page positioning
- **Size customization**: Examples showing width, min-width, and max-width configurations  
- **Data passing**: Complex main_data passing examples with real-world scenarios
- **Event handling**: Interactive examples of opening/closing event subscriptions
- **Form integration**: Contact form example showing form usage in side pages
- **Details view**: Product details example for information display
- **Multi-step wizard**: Wizard process example for complex workflows

## [18.0.60] - Previous Release

### Initial Features
- Basic side page functionality
- Configurable positioning (left/right)
- Customizable dimensions
- Data passing capabilities
- Event system for open/close operations
- Backdrop and close button options
- Z-index configuration
- Angular 15+ compatibility

---

## Release Notes

### Version 18.0.63 Highlights

This release focuses on improving user experience and developer productivity with enhanced body scroll management, better event handling, and a completely redesigned demo application that serves as both a showcase and comprehensive documentation.

**Key Improvements:**
- **Better UX**: Automatic body overflow management prevents awkward scrolling when side pages are open
- **Cleaner Code**: Refactored service with improved TypeScript support and reduced complexity
- **Enhanced Demo**: Professional demo application with real-world examples and interactive features
- **Modern Tooling**: TailwindCSS integration for better styling capabilities

**Breaking Changes:** None - This is a backward-compatible release.

**Migration Guide:** No migration steps required. The changes are internal improvements that maintain full API compatibility.

### Upcoming Features
- Support for multiple concurrent side pages
- Custom animation configurations  
- Additional positioning options (top/bottom)
- Enhanced accessibility features
- Dark theme support

---

*For more information, visit our [GitHub repository](https://github.com/yourusername/ngx-side-page) or check out the [demo application](https://your-demo-url.com).*
