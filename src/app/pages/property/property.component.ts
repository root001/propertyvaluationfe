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
    { reference: 'PV2023030093', receivedOn: '12/12/2023 14:16', borrowersName: 'John Doe', fosRef: '20/12901002', createdOn: '12/12/2023 14:16', modifiedOn: '12/12/2023 14:16' },
    { reference: 'PV2023030095', receivedOn: '12/12/2023 14:16', borrowersName: 'Jack Ripper', fosRef: '22/12901002', createdOn: '12/12/2023 14:16', modifiedOn: '12/12/2023 14:16' },
    { reference: 'PV2023030099', receivedOn: '12/12/2023 14:16', borrowersName: 'Jerkly Strange', fosRef: '20/12901094', createdOn: '12/12/2023 14:16', modifiedOn: '12/12/2023 14:16' }
  ];

  displayTableColumns: string[] = ['reference', 'receivedOn', 'borrowersName', 'fosRef', 'createdOn', 'modifiedOn', 'actions'];


}
