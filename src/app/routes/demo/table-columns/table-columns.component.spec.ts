import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTableColumnsComponent } from './table-columns.component';

describe('DemoTableColumnsComponent', () => {
  let component: DemoTableColumnsComponent;
  let fixture: ComponentFixture<DemoTableColumnsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DemoTableColumnsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTableColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
