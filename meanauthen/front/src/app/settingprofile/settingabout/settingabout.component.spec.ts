import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingaboutComponent } from './settingabout.component';

describe('SettingaboutComponent', () => {
  let component: SettingaboutComponent;
  let fixture: ComponentFixture<SettingaboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingaboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
