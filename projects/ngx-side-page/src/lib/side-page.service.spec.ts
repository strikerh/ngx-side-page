import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SidePageInfo, SidePageService} from './side-page.service';

describe('SidePageService', () => {
  let service: SidePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should close a non-topmost side page and emit the correct events', fakeAsync(() => {
    const startClosingEvents: any[] = [];
    const endClosingEvents: any[] = [];
    const sidePageEmissions: SidePageInfo[][] = [];

    (service as any).startClosing$.subscribe((event: any) => startClosingEvents.push(event));
    (service as any).endClosing$.subscribe((event: any) => endClosingEvents.push(event));
    service.getSidePage().subscribe((pages) => sidePageEmissions.push(pages));

    const firstSidePage: SidePageInfo = {key: 'first', component: {} as any, options: {} as any, state: true};
    const secondSidePage: SidePageInfo = {key: 'second', component: {} as any, options: {} as any, state: true};

    (service as any).sidePages = [firstSidePage, secondSidePage];
    (service as any).sidePages$.next((service as any).sidePages);

    service.closeSidePage('first', 'value');

    expect(startClosingEvents.length).toBe(1);
    expect(startClosingEvents[0]).toEqual(jasmine.objectContaining({key: 'first', value: 'value', sidePage: firstSidePage}));

    expect((service as any).sidePages.length).toBe(1);
    expect(((service as any).sidePages[0] as SidePageInfo).key).toBe('second');
    const lastEmission = sidePageEmissions[sidePageEmissions.length - 1];
    expect(lastEmission.map((page) => page.key)).toEqual(['second']);

    tick(300);

    expect(endClosingEvents.length).toBe(1);
    expect(endClosingEvents[0]).toEqual(jasmine.objectContaining({key: 'first', value: 'value', sidePage: firstSidePage}));
  }));
});
