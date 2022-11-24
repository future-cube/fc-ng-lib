import { PipeTransform, Pipe } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({ name: 'Nl2br' })
export class Nl2brPipe implements PipeTransform {
  transform(value: string): any {
    return value ? value.replace(/\r\n|\n\r|\r|\n/g, '<br ' + ' >') : '';
  }
}
