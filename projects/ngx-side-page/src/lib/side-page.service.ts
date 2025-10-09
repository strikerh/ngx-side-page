import {ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject, filter, map, Observable, Subject, take} from "rxjs";
import {SidePageComponent} from "./side-page.component";
import {SIDE_PAGE_CONFIG} from "./side-page-config.token";

export interface SidePageOption {
  key?: string;
  position?: 'end' | 'start';
  disableClose?: boolean;
  showCloseBtn?: boolean;
  width?: string;
  maxWidth?: string;
  minWidth?: string;

  panelClass?: string;
  backdropClass?: string;
  hasBackdrop?: boolean;
  zIndex?: number;

  data?: any;

}

export interface SidePageConfig {
  minWidth?: string;
  maxWidth?: string;
  width?: string;
  position?: 'start' | 'end';
  disableClose?: boolean;
}


export interface SidePageInfo<T = any> {
  key: string;
  component: T;
  options: SidePageOption;
  state: boolean;
  data?: any;
  ref?: SidePageRef<T>;
}

@Injectable({
  providedIn: 'root',
})
export class SidePageService {

  sidePages: SidePageInfo[] = [];
  initiated: boolean = false;
  private sidePages$ = new BehaviorSubject<SidePageInfo[]>([]);
  private startClosing$ = new Subject<any>();
  private endClosing$ = new Subject<any>();
  private endOpening$ = new Subject<any>();
  private options: SidePageOption = {
    position: 'end',
    width: '100%',
    maxWidth: '400px',
    minWidth: '250px',
    showCloseBtn: true,
    zIndex: 1000,
  } as SidePageOption;

  private config: SidePageConfig;


  constructor(
    private appRef: ApplicationRef,
    @Optional() @Inject(SIDE_PAGE_CONFIG) config: SidePageConfig
  ) {
    this.config = config || {};

    this.sidePages$.subscribe((pages) => {
      if (!this.isBrowser()) {
        return;
      }

      if (pages.length) {
        // Add overflow: hidden to body when any side page is open
        document.body.style.overflow = 'hidden';
      } else {
        // Remove overflow: hidden when all side pages are closed
        document.body.style.overflow = '';
      }
    });

  }


  addComponentToBody() {
    if (!this.isBrowser()) {
      return;
    }

    const componentRef: ComponentRef<SidePageComponent> = createComponent(SidePageComponent, {
      environmentInjector: this.appRef.injector,
    });

    // Set the inputs
    /*componentRef.instance.key = key;
    componentRef.instance.options = options || {};*/

    // Attach component to the application so change detection works
    this.appRef.attachView(componentRef.hostView);
    componentRef.changeDetectorRef.detectChanges();

    // Get the DOM element of the component
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;

    // Append the component's DOM element to the body
    document.body.appendChild(domElem);
  }


  getSidePage() {
    return this.sidePages$.asObservable();
  }

  closeLastSidePage(someValue: any = null) {
    if (!this.sidePages.length) {
      return;
    }

    this.closeSidePageAtIndex(this.sidePages.length - 1, someValue);
  }

  closeSidePage(key: string, someValue: any) {
    const index = this.sidePages.findIndex((sp1) => sp1.key === key);
    if (index === -1) {
      return;
    }

    this.closeSidePageAtIndex(index, someValue);
  }

  private closeSidePageAtIndex(index: number, someValue: any) {
    const sp = this.sidePages[index];

    if (!sp) {
      return;
    }

    this.startClosing$.next({key: sp.key, sidePage: sp, value: someValue});

    this.sidePages.splice(index, 1);
    this.sidePages$.next(this.sidePages);

    setTimeout(() => {
      this.endClosing$.next({key: sp.key, sidePage: sp, value: someValue});
    }, 300);
  }

  openSidePage<T = any>(key: string, component: T, options?: SidePageOption): SidePageRef<T> {
    if (!this.initiated) {
      this.addComponentToBody();
    }

    const _options = {...this.options, ...options};
    const thisSp = {key: key, component, options: _options, state: true};
    const spRef = new SidePageRef<T>(thisSp, this.sidePages, this.endOpening$, this.startClosing$, this.endClosing$, this);
    this.sidePages.push({...thisSp, ref: spRef});
    this.sidePages$.next(this.sidePages);
    // this.sidePages$.complete();
    setTimeout(() => {
      this.endOpening$.next(thisSp);
      // this.endOpening$.complete();
    }, 300);

    return spRef;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }


}

export class SidePageRef<T> {

  constructor(
    private _sidePage: SidePageInfo,
    private _sidePages: SidePageInfo[],
    private _endOpening$: Subject<any>,
    private _startClosing$: Subject<any>,
    private _endClosing$: Subject<any>,
    private _sidePageService: SidePageService
  ) {
  }

  public get key() {
    return this._sidePage.key;
  }

  public get componentInstance(): T {
    return this._sidePage.component;
  }

  public get options() {
    return this._sidePage.options;
  }

  public get openedSidePages() {
    return this._sidePages;
  }

  afterClosed(): Observable<any> {
    return this._endClosing$.asObservable().pipe(
      filter((value) => value.key === this._sidePage.key),
      take(1),
      map((value) => value.value)
    );
  }

  afterOpened(): Observable<void> {
    return this._endOpening$.asObservable().pipe(
      filter((value) => value.key === this._sidePage.key),
      map(() => {
      })
    );
  }

  backdropClick(): Observable<MouseEvent> {
    return {} as any;
  }

  beforeClosed(): Observable<any> {
    return this._startClosing$.asObservable().pipe(
      filter((value) => value.key === this._sidePage.key),
      map((value) => value.value)
    );
  }

  getState() {
    return this._sidePage.state;
  }

  close(someValue?: any): void {
    this._sidePageService.closeSidePage(this._sidePage.key, someValue);

  }
}
