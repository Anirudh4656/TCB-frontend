import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numSuffix'
})
export class NumSuffixPipe implements PipeTransform {

  transform(input: number): string {
    var exp: number, suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];
    if (Number.isNaN(input)) {
      return null;
    }
    if (input < 1000) {
      return input.toString();
    }
    exp = Math.floor(Math.log(input) / Math.log(1000));
    return (input / Math.pow(1000, exp)).toFixed(2) + suffixes[exp - 1];
  }
}
