import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchoOutputComponent } from './echo-output.component';

describe('EchoOutputComponent', () => {
  let component: EchoOutputComponent;
  let fixture: ComponentFixture<EchoOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchoOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchoOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
