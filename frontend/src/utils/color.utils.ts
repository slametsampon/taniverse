// frontend/src/utils/color.utils.ts

export function getRowColor(eventType: string): string {
  switch (eventType) {
    case 'alarm':
      return 'bg-red-100 text-red-800';
    case 'update':
      return 'bg-yellow-50 text-yellow-800';
    case 'create':
      return 'bg-green-100 text-green-800';
    case 'delete':
      return 'bg-gray-300 text-gray-800';
    case 'action':
      return 'bg-blue-100 text-blue-800';
    case 'status':
      return 'bg-blue-50 text-blue-800';
    case 'error':
      return 'bg-pink-100 text-pink-800';
    case 'info':
      return 'bg-gray-100 text-gray-700';
    default:
      return '';
  }
}
