import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocTableComponent } from './table.component';

describe('DocTableComponent', () => {
  let component: DocTableComponent;
  let fixture: ComponentFixture<DocTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
