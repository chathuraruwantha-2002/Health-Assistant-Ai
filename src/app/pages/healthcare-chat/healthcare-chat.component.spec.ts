import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcareChatComponent } from './healthcare-chat.component';

describe('HealthcareChatComponent', () => {
  let component: HealthcareChatComponent;
  let fixture: ComponentFixture<HealthcareChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthcareChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthcareChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
