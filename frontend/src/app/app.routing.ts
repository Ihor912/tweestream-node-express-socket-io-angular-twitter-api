import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tweets',
    loadChildren: () =>
      import('./pages/tweets/tweets.module').then((m) => m.TweetsModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./pages/error-message/error-message.module').then(
        (m) => m.ErrorMessageModule
      ),
  },
  {
    path: '',
    redirectTo: '/tweets',
    pathMatch: 'full',
  },
  { path: '**', pathMatch: 'full', redirectTo: '/error/404' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppRoutingModule {}
