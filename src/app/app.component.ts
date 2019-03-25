import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  fileText: any;
  data: any;
  isLoading = false;

  constructor() {
  }

  get7Segments(ascii) {

    const lines = ascii.split('\n');
    let retVal = '';
    for (let line = 0; line < lines.length; line = line + 2) {
      const arr = [[], [], [], [], [], [], [], [], []]; // Defining 2D array 9 numbers and 7 segments
      let k = 0;
      if (lines[line] === null || lines[line] === undefined) continue;
      let a = lines[line].split('');
      for (let i = 1; i < a.length; i++) {
        if (a[i] === '_') {
          arr[k][0] = true;
        }
        i++;
        i++;
        k++;
      }
      if (line < lines.length) {
        line++;
        if (lines[line] === null || lines[line] === undefined) continue;
        a = lines[line].split('');
        k = 0;
        for (let i = 0; i < a.length; i++) {
          if (a[i] == '|') {
            arr[k][5] = true;
          }
          i++;
          if (a[i] == '_') {
            arr[k][6] = true;
          }
          i++;
          if (a[i] == '|') {
            arr[k][1] = true;
          }
          k++;
        }
      }
      if (line < lines.length) {
        line++;
        if (lines[line] == null || lines[line] == undefined) continue;
        a = lines[line].split('');
        k = 0;
        for (let i = 0; i < a.length; i++) {
          if (a[i] == '|') {
            arr[k][4] = true;
          }
          i++;
          if (a[i] == '_') {
            arr[k][3] = true;
          }
          i++;
          if (a[i] == '|') {
            arr[k][2] = true;
          }
          k++;
        }
      }
      for (let t = 0; t < arr.length; t++) {
        let result = 0;
        for (let u = 0; u < arr[t].length; u++) {
          if (arr[t][u]) result += Math.pow(2, u);
        }
        let res = this.mapData(result) + '';
        retVal += res;
        // console.log(res);
      }
      retVal += '\n';
    }
    console.log(retVal);
    return retVal;
  }

  mapData(n) {
    switch (n) {
      case 63:
        return 0;
      case 6:
        return 1;
      case 91:
        return 2;
      case 79:
        return 3;
      case 102:
        return 4;
      case 109:
        return 5;
      case 125:
        return 6;
      case 7:
        return 7;
      case 127:
        return 8;
      case 111:
        return 9;
      default:
        return 0;
    }
  }

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    const me = this;
    reader.onload = function (e) {
      me.data = reader.result;
      me.isLoading = true;
      me.fileText = reader.result;
    };

  }

  segment() {
    this.get7Segments(this.data);
  }
}

