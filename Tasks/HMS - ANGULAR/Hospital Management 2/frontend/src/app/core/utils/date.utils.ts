export class DateUtils {
  static formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  static formatTime(time: string): string {
    return time;
  }

  static formatDateTime(date: Date | string): string {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }

  static isToday(date: Date | string): boolean {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }

  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
