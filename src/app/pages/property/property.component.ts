import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})
export class PropertyComponent {
onClaim(_t69: any) {
throw new Error('Method not implemented.');
}
onView(_t69: any) {
throw new Error('Method not implemented.');
}

  propertyData = [
    { docType: 'Deed Charge', filename: 'my first file.pdf', size: '2MB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' },
    { docType: 'Site and Location plan', filename: 'my first file.xlsx', size: '15KB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' },
    { docType: 'Birth Certificate', filename: 'my first file.docx', size: '10KB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' }
  ];

  displayTableColumns: string[] = ['docType', 'filename', 'size', 'uploadedBy', 'uploadedOn', 'actions'];


}
