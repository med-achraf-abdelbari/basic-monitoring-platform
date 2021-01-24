import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSitesMonitoringComponent } from './sub-sites-monitoring.component';

describe('SubSitesMonitoringComponent', () => {
  let component: SubSitesMonitoringComponent;
  let fixture: ComponentFixture<SubSitesMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSitesMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubSitesMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
