import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BiomarkerComponent } from './biomarker.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: BiomarkerComponent }
	])],
	exports: [RouterModule]
})
export class BiomarkerRoutingModule { }
