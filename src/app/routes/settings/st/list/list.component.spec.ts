import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStListComponent } from './list.component';

describe('SettingsDatabaseListComponent', () => {
  let component: SettingsStListComponent;
  let fixture: ComponentFixture<SettingsStListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsStListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsStListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
