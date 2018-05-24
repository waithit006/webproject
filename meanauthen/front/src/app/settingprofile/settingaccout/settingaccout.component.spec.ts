import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingaccoutComponent } from './settingaccout.component';

describe('SettingaccoutComponent', () => {
  let component: SettingaccoutComponent;
  let fixture: ComponentFixture<SettingaccoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingaccoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingaccoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
