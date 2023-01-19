import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoVditorComponent } from './vditor.component';

describe('DemoVditorComponent', () => {
  let component: DemoVditorComponent;
  let fixture: ComponentFixture<DemoVditorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoVditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoVditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
