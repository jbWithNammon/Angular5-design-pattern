import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationBefComponent } from './information-bef.component';

describe('InformationBefComponent', () => {
  let component: InformationBefComponent;
  let fixture: ComponentFixture<InformationBefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationBefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationBefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
