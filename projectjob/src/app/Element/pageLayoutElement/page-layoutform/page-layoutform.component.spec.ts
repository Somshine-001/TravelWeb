import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayoutformComponent } from './page-layoutform.component';

describe('PageLayoutformComponent', () => {
  let component: PageLayoutformComponent;
  let fixture: ComponentFixture<PageLayoutformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageLayoutformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageLayoutformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
