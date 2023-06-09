import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemFavoriteComponent } from './item-favorite.component';

describe('ItemFavoriteComponent', () => {
  let component: ItemFavoriteComponent;
  let fixture: ComponentFixture<ItemFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFavoriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
