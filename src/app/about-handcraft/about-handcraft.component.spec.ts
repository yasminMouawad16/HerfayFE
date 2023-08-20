import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutHandcraftComponent } from './about-handcraft.component';

describe('AboutHandcraftComponent', () => {
  let component: AboutHandcraftComponent;
  let fixture: ComponentFixture<AboutHandcraftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutHandcraftComponent]
    });
    fixture = TestBed.createComponent(AboutHandcraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
