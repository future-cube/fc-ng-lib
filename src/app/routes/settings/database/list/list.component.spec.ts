import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsDatabaseListComponent } from './list.component';

describe('SettingsDatabaseListComponent', () => {
  let component: SettingsDatabaseListComponent;
  let fixture: ComponentFixture<SettingsDatabaseListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDatabaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDatabaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
