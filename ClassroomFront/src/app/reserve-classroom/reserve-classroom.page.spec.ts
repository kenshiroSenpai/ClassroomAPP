import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReserveClassroomPage } from './reserve-classroom.page';

describe('ReserveClassroomPage', () => {
  let component: ReserveClassroomPage;
  let fixture: ComponentFixture<ReserveClassroomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveClassroomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReserveClassroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
