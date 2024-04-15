import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform{
   
    transform(value?: Date): string {
        if (value) {
            let year = value.getFullYear();
            let month = this.formatDate(value.getMonth() + 1);
            let day = this.formatDate(value.getDate());

            return `${day}.${month}.${year}`
        } else {
            return '';
        }
    }

    formatDate(dateValue: number): string{
        if(dateValue < 10){
            return `0${dateValue}`;
        } 
        return `${dateValue}`; 
    }
}
