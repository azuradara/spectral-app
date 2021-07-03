export interface NewNotification {
  title: string;
  message: string;
  type: 'error' | 'default';
}

export interface Notification extends NewNotification {
  id: number;
}
