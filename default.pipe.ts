import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(!!value) {
      for(let i = 0; i < value.length; i++) {
        value[i] += i;
      }
      return value;
    }
  }

}
