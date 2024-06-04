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
import { appConstants } from '../../core/constants/constant';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataServiceService } from '../../core/data-service.service';

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
  fileUpload!: any;
  propFormGroup !: FormGroup;
  userObject !: any;

  commentsData = [
    { date: '12/12/2023 12:34', user: 'USER001', comments: 'This is a first user comment' },
    { date: '12/12/2023 12:34', user: 'USER001', comments: 'This is another user comment which is longer than the first one' }
  ];

  documentTypes = ['Deed Charge', 'Site and Location plan', 'National ID card', 'Quotation', 'Birth Certificate'];
 /**  uploadedFiles = [
    { docType: 'Deed Charge', filename: 'my first file.pdf', size: '2MB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' },
    { docType: 'Site and Location plan', filename: 'my first file.xlsx', size: '15KB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' },
    { docType: 'Birth Certificate', filename: 'my first file.docx', size: '10KB', uploadedBy: 'USER001', uploadedOn: '12/12/2023 14:16' }
  ];*/
  uploadedFiles: UploadedFile[] = [];

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

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dataService:DataServiceService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
    this.initializeForms();
    this.fileUpload = {};
  }

  /**
   * 
   */
  private fetchUserDetails():void {

    const getRequest = {
      url: appConstants.baseUrl + appConstants.userEndpoint + localStorage.getItem('userid')
    };
    this.dataService.getApi(getRequest).subscribe(
      (response: any) => {
        if (response) {
          this.userObject = response;
          console.log('Form submitted successfully', response);
          console.log('user object : ',this.userObject);
          this.snackBar.open(appConstants.createSuccessMsg, 'close', {
            duration: 3000
          });
        }
      },
      error => {
        console.error('Form submission error', error);
        this.snackBar.open('Form submission failed', 'close', {
          duration: 3000
        });
      });
  }

  private initializeForms(): void {

    this.propFormGroup = this.formBuilder.group({
      steps: this.formBuilder.group({
        InitiatorFormGroup: this.formBuilder.group({
          initiatorName: [{ value: this.userObj.name, disabled: true }, Validators.required],
          businessUnit: ['', Validators.required],
          contactNumber: ['', Validators.required],
        }),
        facilityFormGroup: this.formBuilder.group({
          facilityType: ['', Validators.required],
          category: ['', Validators.required],
          purpose: ['', Validators.required],
          term: ['', Validators.required],
          currency: ['', Validators.required],
          amount: ['', Validators.required],
          housingLoan: [false]
        }),
        propertyFormGroup: this.formBuilder.group({
          isFosRef: ['', Validators.required],
          valuationType: ['', Validators.required],
          fosRefNo: ['', Validators.required],
        }),
        userProfileForm: this.formBuilder.group({
          personalInfo: this.formBuilder.group({
            customerNumber: ['', Validators.required],
            customerName: ['', Validators.required],
            customerAddress: [''],
            contactNumber: ['', Validators.required],
            customerEmail: ['', Validators.required],
          }),
          addresses: this.formBuilder.array([this.createAddressGroup()])
        }),
        commentsFormGroup: this.formBuilder.group({
          commentsAddress: ['']
        }),
        uploadFormGroup: this.formBuilder.group({
          documentType: ['', Validators.required]
        })
      })
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

  getFormGroup(groupName: string, subGroupName: string): FormGroup {
    return (this.propFormGroup.get(groupName) as FormGroup).get(subGroupName) as FormGroup;
  }

  get addressGroups(): FormArray {
    return this.propFormGroup.get('steps')!.get('userProfileForm')!.get('addresses') as FormArray;
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
      const documentType = this.propFormGroup.get('steps.uploadStep.documentType')?.value;
      const uploadedOn = new Date().toISOString();
      const newFile: UploadedFile = {
        docType: documentType,
        filename: file.name,
        size: this.formatBytes(file.size),
        uploadedBy: 'USER001',
        uploadedOn,
        fileData: file
      };
      this.uploadedFiles.push(newFile);
      console.log('File uploaded:', newFile);
    }
  }

  downloadFile(element: UploadedFile): void {
    const blob = new Blob([element.fileData], { type: element.fileData.type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = element.filename;
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('File downloaded:', element);
  }

  deleteFile(element: UploadedFile): void {
    const index = this.uploadedFiles.indexOf(element);
    if (index >= 0) {
      this.uploadedFiles.splice(index, 1);
      console.log('File deleted:', element);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    console.log(this.propFormGroup.value);
    // Handle form submission logic here
    formData.append('comments', this.propFormGroup.get('steps.commentsStep.comments')?.value);
    this.uploadedFiles.forEach((file, index) => {
      formData.append(`files[${index}][docType]`, file.docType);
      formData.append(`files[${index}][filename]`, file.filename);
      formData.append(`files[${index}][size]`, file.size);
      formData.append(`files[${index}][uploadedBy]`, file.uploadedBy);
      formData.append(`files[${index}][uploadedOn]`, file.uploadedOn);
      formData.append(`files[${index}][fileData]`, file.fileData, file.filename);
    });

    const postRequest = {
      url: appConstants.baseUrl + appConstants.facilityEndpoint,
      data: formData
    };
    this.dataService.postAPI(postRequest).subscribe(
      (response: any) => {
        if (response) {
          console.log('Form submitted successfully', response);
          this.snackBar.open(appConstants.createSuccessMsg, 'close', {
            duration: 3000
          });
        }
      },
      error => {
        console.error('Form submission error', error);
        this.snackBar.open('Form submission failed', 'close', {
          duration: 3000
        });
      });

  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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

interface UploadedFile {
  docType: string;
  filename: string;
  size: string;
  uploadedBy: string;
  uploadedOn: string;
  fileData: Blob;
}