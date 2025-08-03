export interface AccountInterface {
  id: string;
  recordLabel: string;
  recordType: 'local' | 'ldap';
  login: string;
  password: string | null;
}
