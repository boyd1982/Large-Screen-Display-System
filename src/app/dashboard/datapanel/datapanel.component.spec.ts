import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatapanelComponent } from './datapanel.component';

describe('DatapanelComponent', () => {
  let component: DatapanelComponent;
  let fixture: ComponentFixture<DatapanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatapanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatapanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
