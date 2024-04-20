import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { column } from './column.model';


enum BlobFileTypes {
  xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  csv = 'text/csv;charset=utf-8',
  base64 = "data:application/octet-stream;base64",
  zip = 'application/zip'
}

@Injectable({
  providedIn: 'root'
})
export class ExportPackageService {

  exportData(data: { [key: string]: any }, cols: { [key: string]: any }, type: string, name: string, header: string[],options?:{[key:string]:any}) {
    const sheet: { [key: string]: any } = {};
    Object.keys(data).forEach((key: string) => {
      if (Object.keys(cols).length > 0) {
        data[key] = this.prepareDateCols(cols[key], data[key],options?options['dateFormat']:'dd-MM-yyyy');
        data[key] = this.prepareLabels(cols[key], data[key]);
      }
      sheet[key] = XLSX.utils.json_to_sheet(data[key])
    })
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    Object.keys(sheet).forEach((key: string) => {
      XLSX.utils.book_append_sheet(workBook, sheet[key], key);
    })
    XLSX.writeFile(workBook, name + `.${type}`);
  }

  prepareDateCols(cols: column[], arr: any[],dateFormat='dd-MM-yyyy') {
    console.log(cols,dateFormat)
    const dateCols = cols.filter(
      (col: column) => col.type === 'date' && !col.control.isDateTime);
    dateCols.forEach((col: column) => {
      arr = arr.reduce((arr: any, el: any) => {
        const res = {
          ...el,
          [col.control.name]: el[col.control.name] ? formatDate(
            new Date(+el[col.control.name]),
            dateFormat,
            'en-US',
            '+0000'
          ) : '',
        };
        return [...arr, res];
      }, []);
    });
    const dateTimeCols = cols.filter((col: column) => col.type === 'date_time' || col.control.isDateTime)
    dateTimeCols.forEach((col: column) => {
      arr = arr.reduce((arr: any, el: any) => {
        const res = {
          ...el,
          [col.control.name]: el[col.control.name] ? formatDate(
            new Date(+el[col.control.name]),
            `${dateFormat}-h:mm a`,
            'en-US',
            '+0000'
          ) : '',
        };
        return [...arr, res];
      }, []);
    });
    return arr;
  }

  prepareLabels(cols: column[], arr: any[]) {
    return arr.map(record => {
      const obj: any = {};
      cols.forEach((col: column) => {
        obj[col.control.label] = record[col.control.name]
      })
      return obj
    })
  }

  download(fileName: string, fileType: 'csv' | 'zip' | 'base64' | 'xlsx', data: any, isFile?: boolean) {
    if (isFile) {
      saveAs.saveAs(data, fileName + `.${fileType}`);
    } else {
      const blob = new Blob([data], { type: BlobFileTypes[fileType] });
      saveAs.saveAs(blob, fileName + `.${fileType}`);
    }
  }
}
