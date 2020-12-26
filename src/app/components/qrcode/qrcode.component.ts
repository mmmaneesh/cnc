import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QRCodeModule } from 'angular2-qrcode';
import { jsPDF }  from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  qrvalue : string = '';
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  constructor(private dialogRef : MatDialogRef<QrcodeComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.qrvalue = data.qrvalue;
      
   }

  ngOnInit() {
  }

  onNoClick(){

    
    this.dialogRef.close();
  }

  public downloadAsPDF() {
    /* const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf'); */

    let pdf = new jsPDF('l', 'pt', 'a4');
    let options = {
      pagesplit: true
   };
    pdf.addHTML(this.pdfTable.nativeElement, 0, 0, options, () => {
      pdf.save("ProductQRcode.pdf");
   });
  }

}
