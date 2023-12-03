import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDatabaseTableComponent } from './table.component';

describe('SettingsDatabaseListComponent', () => {
  let component: SettingsDatabaseTableComponent;
  let fixture: ComponentFixture<SettingsDatabaseTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsDatabaseTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
