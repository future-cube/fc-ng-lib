import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfComponent } from './sf.component';

describe('SfComponent', () => {
  let component: SfComponent;
  let fixture: ComponentFixture<SfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
