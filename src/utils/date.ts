export class DateHelper {
  static getFormattedDate(date: Date): string {
    return `${weekday[date.getDay()]} ${date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`;
  }
}

const weekday = [ "Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
