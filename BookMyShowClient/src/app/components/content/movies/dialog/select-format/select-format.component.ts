import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-format',
  templateUrl: './select-format.component.html',
  styleUrls: ['./select-format.component.scss']
})
export class SelectFormatComponent implements OnInit {

  selectedFormat: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<SelectFormatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formats: string[] }
  ) {}

  onCancel(): void {
    this.dialogRef.close(null);
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedFormat);
  }

  ngOnInit(): void {
  }

}
