import { RecordLabels } from '@/features/accounts/types/recordLabel.interface';

export interface AccountInterface {
  id: string;
  recordLabels: RecordLabels;
  recordType: 'local' | 'ldap';
  login: string;
  password: string | null;
  validated: boolean;
}
