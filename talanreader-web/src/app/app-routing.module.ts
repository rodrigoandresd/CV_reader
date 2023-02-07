import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrefilledComponent } from './pages/prefilled/prefilled.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  { path: 'form', component: PrefilledComponent },
  { path: 'upload', component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
