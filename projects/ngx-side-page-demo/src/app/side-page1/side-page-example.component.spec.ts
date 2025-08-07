import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePageExampleComponent } from './side-page-example.component';

describe('SidePageExampleComponent', () => {
  let component: SidePageExampleComponent;
  let fixture: ComponentFixture<SidePageExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePageExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePageExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
