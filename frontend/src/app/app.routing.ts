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
    path: '',
    redirectTo: '/tweets',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AppRoutingModule {}
