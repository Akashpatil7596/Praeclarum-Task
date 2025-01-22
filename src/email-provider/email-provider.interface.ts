export interface SendMailData {
  to: string;
  from: string;
  subject: string;
  template: string;
  context: object;
}
