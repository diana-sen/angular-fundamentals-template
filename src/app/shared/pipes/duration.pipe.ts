import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    // Add your code here
    transform(value: number | undefined): string {
        if (value) {
            let result = '';
            const hours: number = Math.floor(value / 60);
            const minutes: number = Math.round(value % 60);
            return `${this.formatTime(hours)}:${this.formatTime(minutes)} ${hours <= 1 ? ' hour': ' hours'}`;
        } else {
            return '0:00'
        }
    }

    formatTime(value: number): string {
        let time = '';
        return `${value < 10 ? '0' + value : value }`
    }
}
