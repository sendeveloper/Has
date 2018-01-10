import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    imports: [MatButtonModule, MatSelectModule, MatTabsModule, MatToolbarModule, MatInputModule, MatCheckboxModule, MatDialogModule],
    exports: [MatButtonModule, MatSelectModule, MatTabsModule, MatToolbarModule, MatInputModule, MatCheckboxModule, MatDialogModule],
})
export class MaterialModule { }
