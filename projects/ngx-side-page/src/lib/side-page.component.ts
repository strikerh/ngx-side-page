import {
  Component,
  OnInit,
} from '@angular/core';
import {SidePageInfo, SidePageOption, SidePageService} from './side-page.service';
import {CommonModule} from '@angular/common';
import {animations, resolveDirection} from './animation';
import {PageComponent} from "./page/page.component";

@Component({
  selector: 'app-side-page',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent
  ],
  templateUrl: './side-page.component.html',
  styleUrls: ['./side-page.component.scss'],
  animations: animations(), // We'll keep this but update the logic

})
export class SidePageComponent implements OnInit {

  sidePages: SidePageInfo[] = [];

  key = '';
  options: SidePageOption = {};

  constructor(
    private sidePageService: SidePageService,
  ) {
  }

  ngOnInit() {
    this.sidePageService.initiated = true;
    this.sidePageService.getSidePage().subscribe((sidePages) => {
      this.sidePages = sidePages;
    });
  }

  close(sidePage: SidePageInfo, value: any = null) {
    if (sidePage.options.disableClose)
      return;
    if (this.sidePageService)
      this.sidePageService.closeSidePage(sidePage.key, value);
  }

  // Helper method to get current direction for dynamic checks
  getCurrentDirection(): 'ltr' | 'rtl' {
    return resolveDirection();
  }

  // Helper method to check if backdrop should be shown
  // Returns true if at least one side page has hasBackdrop enabled (default is true)
  shouldShowBackdrop(): boolean {
    return this.sidePages.some(sp => sp.options.hasBackdrop !== false);
  }

  // Helper method to get backdrop custom classes
  getBackdropClass(): string {
    // Get backdrop classes from all open side pages (last one takes precedence)
    if (this.sidePages.length > 0) {
      const lastPage = this.sidePages[this.sidePages.length - 1];
      return lastPage.options.backdropClass || '';
    }
    return '';
  }

  // Helper method to get overlay z-index (should be lower than side pages)
  getOverlayZIndex(): number {
    if (this.sidePages.length > 0) {
      // Get the highest z-index from all open side pages and subtract 1 for overlay
      const maxZIndex = Math.max(...this.sidePages.map(sp => sp.options.zIndex || 1000));
      return maxZIndex - 1;
    }
    return 999; // Default overlay z-index
  }

  // Get animation direction parameter based on position and RTL direction
  getAnimationDirection(position: 'start' | 'end'): string {
    const isRTL = this.getCurrentDirection() === 'rtl';
    
    if (position === 'end') {
      // End position: slide from right in LTR, from left in RTL
      return isRTL ? '-100%' : '100%';
    } else {
      // Start position: slide from left in LTR, from right in RTL
      return isRTL ? '100%' : '-100%';
    }
  }

  // Helper method to determine animation trigger based on position and direction
  getAnimationTrigger(position: 'start' | 'end'): string {
    const isRtl = this.getCurrentDirection() === 'rtl';
    
    // In RTL mode, the logic should be inverted:
    // - position 'end' should slide from left (like 'start' in LTR)
    // - position 'start' should slide from right (like 'end' in LTR)
    if (isRtl) {
      return position === 'end' ? 'slideInOutStart' : 'slideInOut';
    } else {
      return position === 'end' ? 'slideInOut' : 'slideInOutStart';
    }
  }
}
