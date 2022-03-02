import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileFlexGridComponent } from './tile-flex-grid.component';

describe('TileFlexGridComponent', () => {
  let component: TileFlexGridComponent;
  let fixture: ComponentFixture<TileFlexGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileFlexGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileFlexGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
