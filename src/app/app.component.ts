import { Component } from '@angular/core';
import * as readlines from 'n-readlines';
import * as fs from 'fs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'userStory';

  userStory = {};
  topSecret = new readlines('/../src/app/text/top_secret.txt');
  inputUserStory = new readlines('/../src/app/text/input_user_story.txt');

  constructor() {
    console.log(this.topSecret);
  }

  getNumber(liner) {
    const digits = {
      ' _ | ||_|': 0,
      '     |  |': 1,
      ' _  _||_ ': 2,
      ' _  _| _|': 3,
      '   |_|  |': 4,
      ' _ |_  _|': 5,
      ' _ |_ |_|': 6,
      ' _   |  |': 7,
      ' _ |_||_|': 8,
      ' _ |_|  |': 9,
      ' _ |_| _|': 9
    };
    let line;
    let lineNumber = 0;
    let lines = [];
    let val = [];
    let result = '';
    while ((line = liner.next())) {
      lines[lineNumber] = line.toString('ascii');
      lineNumber++;
      if (lineNumber > 2) {
        for (let i = 0; i < lines.length; i++) {
          for (let j = 0; j < lines[i].length / 3; j++) {
            if (!val[j]) val[j] = '';
            val[j] = val[j] + lines[i].substr(j * 3, 3);
          }
        }
        let numberLine = '';
        let isLegal = true;
        for (let i = 0; i < val.length; i++) {
          if (digits[val[i]] === undefined) {
            isLegal = false;
            numberLine = numberLine + '?';
          } else {
            numberLine = numberLine + digits[val[i]];
          }
        }
        if (!isLegal) {
          numberLine = numberLine + ' ILLEGAL' + '\n';
        } else {
          numberLine = numberLine + '\n';
        }
        result = result + numberLine;
        line = liner.next();
        lineNumber = 0;
        lines = [];
        val = [];
      }
    }

    return result;
  }

  getTopSecret() {
    const series = this.getNumber(this.topSecret);
    fs.writeFile('output_top_secret_1.txt', series, () =>  {
      console.log('series', series);
});
  }

  getParseInvoice() {
    const series = this.getNumber(this.inputUserStory);
    fs.writeFile('output_top_secret.txt', series, () =>  {
      console.log('series', series);
});
  }
}
