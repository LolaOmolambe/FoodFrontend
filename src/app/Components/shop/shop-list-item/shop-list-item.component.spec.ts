import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListItemComponent } from './shop-list-item.component';

describe('ShopListItemComponent', () => {
  let component: ShopListItemComponent;
  let fixture: ComponentFixture<ShopListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
