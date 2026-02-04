import { FormInterface } from '@/features/accounts/types/form.interface';
import { ErrorsInterface } from '@/features/accounts/types/errors.interface';

export function validateForm(form: FormInterface, errors: ErrorsInterface): boolean {
  errors.login = form.login === '';

  errors.recordType = !['local', 'ldap'].includes(form.recordType);

  if (form.recordType !== 'ldap') {
    errors.password = !form.password || form.password.trim() === '';
  } else {
    errors.password = false;
  }

  return !errors.login && !errors.password && !errors.recordType;
}
