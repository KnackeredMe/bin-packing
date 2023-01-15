import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinPackingComponent } from './bin-packing.component';

describe('BinPackingComponent', () => {
  let component: BinPackingComponent;
  let fixture: ComponentFixture<BinPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinPackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BinPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
