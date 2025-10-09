import {Injector} from '@angular/core';

import {PageComponent} from './page.component';
import {SidePageService} from '../side-page.service';

describe('PageComponent', () => {
  it('should create', () => {
    const serviceMock = {
      closeLastSidePage: jasmine.createSpy('closeLastSidePage'),
    } as Partial<SidePageService> as SidePageService;

    const component = new PageComponent(serviceMock, {} as Injector);

    expect(component).toBeTruthy();
  });
});
