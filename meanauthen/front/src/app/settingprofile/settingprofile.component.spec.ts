import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingprofileComponent } from './settingprofile.component';

describe('SettingprofileComponent', () => {
  let component: SettingprofileComponent;
  let fixture: ComponentFixture<SettingprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
