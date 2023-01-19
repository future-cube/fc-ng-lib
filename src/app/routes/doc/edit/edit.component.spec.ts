import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DocEditComponent } from './edit.component';

describe('DocEditComponent', () => {
  let component: DocEditComponent;
  let fixture: ComponentFixture<DocEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DocEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
