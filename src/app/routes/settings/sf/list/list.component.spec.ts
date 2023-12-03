import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSfListComponent } from './list.component';

describe('SettingsDatabaseListComponent', () => {
  let component: SettingsSfListComponent;
  let fixture: ComponentFixture<SettingsSfListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsSfListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsSfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
