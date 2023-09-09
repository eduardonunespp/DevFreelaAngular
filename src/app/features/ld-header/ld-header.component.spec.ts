import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdHeaderComponent } from './ld-header.component';

describe('LdHeaderComponent', () => {
  let component: LdHeaderComponent;
  let fixture: ComponentFixture<LdHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LdHeaderComponent]
    });
    fixture = TestBed.createComponent(LdHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
