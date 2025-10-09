import {BehaviorSubject} from 'rxjs';

import {SidePageComponent} from './side-page.component';
import {SidePageInfo, SidePageService} from './side-page.service';

describe('SidePageComponent', () => {
  it('should create', () => {
    const pages$ = new BehaviorSubject<SidePageInfo[]>([]);
    const serviceMock = {
      initiated: false,
      getSidePage: () => pages$.asObservable(),
      closeSidePage: jasmine.createSpy('closeSidePage'),
    } as Pick<SidePageService, 'getSidePage' | 'closeSidePage'> & {initiated: boolean};

    const component = new SidePageComponent(serviceMock as SidePageService);

    expect(component).toBeTruthy();
  });
});
