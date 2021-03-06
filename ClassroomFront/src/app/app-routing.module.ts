import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'classroom',
    loadChildren: () => import('./classroom/classroom.module').then( m => m.ClassroomPageModule)
  },
  {
    path: 'my-reserve',
    loadChildren: () => import('./my-reserve/my-reserve.module').then( m => m.MyReservePageModule)
  },
  {
    path: 'reserve-classroom',
    loadChildren: () => import('./reserve-classroom/reserve-classroom.module').then( m => m.ReserveClassroomPageModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-info/user-info.module').then( m => m.UserInfoPageModule)
  },
  {
    path: 'admin-user',
    loadChildren: () => import('./admin-user/admin-user.module').then( m => m.AdminUserPageModule)
  },
  {
    path: 'register-user',
    loadChildren: () => import('./register-user/register-user.module').then( m => m.RegisterUserPageModule)
  },
  {
    path: 'update-user-info',
    loadChildren: () => import('./update-user-info/update-user-info.module').then( m => m.UpdateUserInfoPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'create-classroom',
    loadChildren: () => import('./create-classroom/create-classroom.module').then( m => m.CreateClassroomPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
