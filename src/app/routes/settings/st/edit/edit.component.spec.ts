import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStEditComponent } from './edit.component';

describe('SettingsStEditComponent', () => {
  let component: SettingsStEditComponent;
  let fixture: ComponentFixture<SettingsStEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsStEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsStEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
