import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminUserPage } from './admin-user.page';

describe('AdminUserPage', () => {
  let component: AdminUserPage;
  let fixture: ComponentFixture<AdminUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
