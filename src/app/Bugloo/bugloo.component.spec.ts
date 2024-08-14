import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuglooComponent } from './bugloo.component';

describe('BuglooComponent', () => {
  let component: BuglooComponent;
  let fixture: ComponentFixture<BuglooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuglooComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuglooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
