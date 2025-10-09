import {ApplicationRef} from '@angular/core';
import {fakeAsync, tick} from '@angular/core/testing';
import {BehaviorSubject} from 'rxjs';

import {SidePageService} from './side-page.service';

class MockApplicationRef implements Partial<ApplicationRef> {
  injector = {} as any;
  viewCount = 0;
  componentTypes: any[] = [];
  components: any[] = [];
  isStable = new BehaviorSubject(true).asObservable();

  attachView(): void {}

  detachView(): void {}

  tick(): void {}

  whenStable(): Promise<void> {
    return Promise.resolve();
  }

  destroy(): void {}

  get destroyed(): boolean {
    return false;
  }
}

describe('SidePageService', () => {
  let service: SidePageService;

  beforeEach(() => {
    service = new SidePageService(new MockApplicationRef() as unknown as ApplicationRef, undefined as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('closes a non-topmost side page without affecting newer pages', fakeAsync(() => {
    service['initiated'] = true;

    const emissions: string[][] = [];
    const subscription = service.getSidePage().subscribe((pages) => {
      emissions.push(pages.map((page) => page.key));
    });

    const firstRef = service.openSidePage('first', {} as any);
    service.openSidePage('second', {} as any);

    expect(service.sidePages.map((page) => page.key)).toEqual(['first', 'second']);

    let closedValue: any = undefined;
    firstRef.afterClosed().subscribe((value) => (closedValue = value));

    service.closeSidePage('first', 'background close');

    expect(service.sidePages.map((page) => page.key)).toEqual(['second']);
    expect(emissions[emissions.length - 1]).toEqual(['second']);

    tick(300);

    expect(closedValue).toBe('background close');

    subscription.unsubscribe();
  }));

  it('ignores requests to close unknown side pages', fakeAsync(() => {
    service['initiated'] = true;

    const emissions: string[][] = [];
    const subscription = service.getSidePage().subscribe((pages) => {
      emissions.push(pages.map((page) => page.key));
    });

    service.openSidePage('first', {} as any);

    service.closeSidePage('missing', 'value');

    expect(service.sidePages.map((page) => page.key)).toEqual(['first']);
    expect(emissions[emissions.length - 1]).toEqual(['first']);

    tick(300);

    subscription.unsubscribe();
  }));
});
