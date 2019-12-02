import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyReservePage } from './my-reserve.page';

describe('MyReservePage', () => {
  let component: MyReservePage;
  let fixture: ComponentFixture<MyReservePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReservePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyReservePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
