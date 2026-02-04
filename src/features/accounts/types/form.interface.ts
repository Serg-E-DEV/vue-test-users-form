export interface FormInterface {
  recordLabels: string;
  login: string;
  recordType: 'local' | 'ldap';
  password: string | null;
}
