import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormArray, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    CommonModule,
    MatTableModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  InitiatorFormGroup!: FormGroup;
  facilityFormGroup!: FormGroup;
  propertyFormGroup!: FormGroup;
  userProfileForm!: FormGroup;
  commentsFormGroup!: FormGroup;
  uploadFormGroup!: FormGroup;
  fileUpload!: any;

  commentsData = [
    { date: '12/12/2023 12:34', user: 'USER001', comments: 'This is a first user comment' },
    { date: '12/12/2023 12:34', user: 'USER001', comments: 'This is another user comment which is longer than the first one' }
  ];

  documentTypes = ['Deed Charge', 'Site and Location plan', 'National ID card', 'Quotation', 'Birth Certificate'];
  uploadedFiles = [
    { docType: 'Deed Charge', filename: 'my first file.pdf', size: '2MB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' },
    { docType: 'Site and Location plan', filename: 'my first file.xlsx', size: '15KB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' },
    { docType: 'Birth Certificate', filename: 'my first file.docx', size: '10KB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' }
  ];

  displayedColumns: string[] = ['date', 'user', 'comments'];
  displayedColumnsUpload: string[] = ['docType', 'filename', 'size', 'uploadedBy', 'uploadedOn', 'actions'];

  userObj = { name: 'John Doe' };
  facility: StringProp[] = [
    {value: 'revolving', viewValue: 'Revolving'},
    {value: 'non-revolving', viewValue: 'Non-revolving'},
  ];

  category: NumStringProp[] = [
    {value: 25000, viewValue: 'Apartment'},
    {value: 25010, viewValue: 'PBWM Housing'},
  ];

  purpose: NumStringProp[] = [
    {value: 1, viewValue: 'Reparation'},
    {value: 2, viewValue: 'Inheritance'},
    {value: 3, viewValue: 'Construction'},
  ];

  currency: StringProp[] = [
    {value: 'MUR', viewValue: 'MUR'},
    {value: 'EUR', viewValue: 'EUR'},
    {value: 'USD', viewValue: 'USD'},
    {value: 'GBP', viewValue: 'GBP'},
    {value: 'ZAR', viewValue: 'ZAR'},
  ];

  evaluation: StringProp[] = [
    {value: 'new', viewValue: 'New'},
    {value: 'existing', viewValue: 'Existing'},
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForms();
    this.fileUpload = {};
  }

  private initializeForms(): void {
    this.InitiatorFormGroup = this.formBuilder.group({
      initiatorName: [{ value: this.userObj.name, disabled: true }, Validators.required],
      businessUnit: ['', Validators.required],
      contactNumber: ['', Validators.required]
    });

    this.facilityFormGroup = this.formBuilder.group({
      facilityType: ['', Validators.required],
      category: ['', Validators.required],
      purpose: ['', Validators.required],
      term: ['', Validators.required],
      currency: [this.currency[0].value, Validators.required],
      amount: ['', Validators.required],
      housingLoan: [false, Validators.required]
    });

    this.propertyFormGroup = this.formBuilder.group({
      isFosRef: [''],
      valuationType: ['', Validators.required],
      fosRefNo: ['', Validators.required]
    });

    this.userProfileForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        customerNumber: ['', Validators.required],
        customerName: ['', Validators.required],
        customerAddress: ['', Validators.required],
        contactNumber: ['', Validators.required],
        customerEmail: ['', Validators.required]
      }),
      addresses: this.formBuilder.array([this.createAddressGroup()])
    });

    this.commentsFormGroup = this.formBuilder.group({
      commentsAddress: ['', Validators.required]
    });

    this.uploadFormGroup = this.formBuilder.group({
      documentType: ['', Validators.required]
    });

    
  }

  private createAddressGroup(): FormGroup {
    return this.formBuilder.group({
      jointCustomerNumber: ['', Validators.required],
      jointCustomerName: ['', Validators.required],
      jointCustomerAddress: ['', Validators.required],
      jointContactNumber: ['', Validators.required],
      jointCustomerEmail: ['', Validators.required]
    });
  }

  get addressGroups(): FormArray {
    return this.userProfileForm.get('addresses') as FormArray;
  }

  addAddress(): void {
    this.addressGroups.push(this.createAddressGroup());
  }

  removeAddress(index: number): void {
    this.addressGroups.removeAt(index);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // Handle file upload logic here
    }
  }

  downloadFile(element: any): void {
    console.log('Download file:', element);
    // Handle file download logic here
  }

  deleteFile(element: any): void {
    console.log('Delete file:', element);
    // Handle file delete logic here
  }

  onSubmit(): void {
  //  console.log('Form submitted:', this.formGroup.value);
    // Handle form submission logic here
  }
}

interface StringProp {
  value: string;
  viewValue: string;
}

interface NumStringProp {
  value: Number;
  viewValue: string;
}