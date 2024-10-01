import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthenticationGuard } from './core/auth/authentication.guard';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { DashboardComponent } from './all-modules/dashboard/dashboard.component';
import { LoginGuard } from './guard/login.guard';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'login', component: AuthentificationComponent,  canActivate: [LoginGuard] },
  // { path: 'index', component: DashboardComponent, canActivate: [AuthenticationGuard] }, // Assurez-vous que cette route est configurée


  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // {
  //   path: 'login',
  //   loadChildren: () =>
  //     import('./all-modules/authentication/login/login.module').then(
  //       (m) => m.LoginModule
  //     ),
  // },
  {
    path: 'forgot-pass',
    loadChildren: () =>
      import(
        './all-modules/authentication/forgot-password/forgot-password.module'
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./all-modules/authentication/regiser/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'lock-screen',
    loadChildren: () =>
      import('./all-modules/authentication/lock-screen/lock-screen.module').then(
        (m) => m.LockScreenModule
      ),
  },
  {
    path: 'error-first',
    loadChildren: () =>
      import('./pages/error-pages/error-first/error-first.module').then(
        (m) => m.ErrorFirstModule
      ),
  },
  {
    path: 'error-second',
    loadChildren: () =>
      import('./pages/error-pages/error-second/error-second.module').then(
        (m) => m.ErrorSecondModule
      ),
  },
  {
    path: 'invoice-reports',
    loadChildren: () =>
      import('./all-modules/invoice-reports/invoice-reports.module').then(
        (m) => m.InvoiceReportsModule
      ),
    canActivate: [AuthenticationGuard],

  },
  {
    path: '',
    loadChildren: () =>
    import('./all-modules/all-modules.module').then(m => m.AllModulesModule)
},
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: PreloadAllModules,
    // relativeLinkResolution: 'legacy'
}),

  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
