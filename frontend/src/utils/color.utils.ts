// frontend/src/utils/color.utils.ts

export function getRowColor(eventType: string): string {
  switch (eventType.toUpperCase()) {
    case 'ALARM_HI':
    case 'ALARMHI':
    case 'ALARM-HI':
      return 'bg-red-100 text-red-800';
    case 'ALARM_LO':
    case 'ALARMLOW':
    case 'ALARM-LO':
      return 'bg-blue-100 text-blue-800';
    case 'STATUS':
      return 'bg-green-100 text-green-800';
    case 'ERROR':
      return 'bg-yellow-100 text-yellow-900';
    case 'INFO':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-white';
  }
}
