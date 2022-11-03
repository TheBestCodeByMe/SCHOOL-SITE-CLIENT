import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDirectorComponent } from './menu-director.component';

describe('MenuDirectorComponent', () => {
  let component: MenuDirectorComponent;
  let fixture: ComponentFixture<MenuDirectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuDirectorComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
