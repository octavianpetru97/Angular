import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchEventComponent } from './fetch-event.component';

describe('FetchEventComponent', () => {
  let component: FetchEventComponent;
  let fixture: ComponentFixture<FetchEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
