import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'nl2br' })
export class Nl2brPipe implements PipeTransform {
  transform(value: string): any {
    return value ? value.replace(/\r\n|\n\r|\r|\n/g, '<br ' + ' >') : '';
  }
}
