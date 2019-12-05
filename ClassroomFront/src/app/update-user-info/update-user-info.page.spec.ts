import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateUserInfoPage } from './update-user-info.page';

describe('UpdateUserInfoPage', () => {
  let component: UpdateUserInfoPage;
  let fixture: ComponentFixture<UpdateUserInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
