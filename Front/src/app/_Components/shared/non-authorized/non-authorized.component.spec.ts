import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthorizedComponent } from './non-authorized.component';

describe('NonAuthorizedComponent', () => {
  let component: NonAuthorizedComponent;
  let fixture: ComponentFixture<NonAuthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonAuthorizedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAuthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
