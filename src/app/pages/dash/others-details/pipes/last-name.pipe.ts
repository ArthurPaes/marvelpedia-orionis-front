import { Pipe, PipeTransform } from '@angular/core';
/*
 * getLastName
 *
 * Return the last word of a sentence.
 * So, if you have a long name, it will return the last name.
 * Example:
 *   {{ Rodrigo de Paula Costa Mota Lima | getLastName }}
 *   Returns: Lima
 */
@Pipe({
  name: 'getLastName',
})
export class LastNamePipe implements PipeTransform {
  transform(lastName: string): string | undefined {
    return lastName.split(' ').at(-1);
  }
}
