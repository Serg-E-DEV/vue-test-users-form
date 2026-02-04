import { FormInterface } from '@/interfaces/form.interface';
import { ErrorsInterface } from '@/interfaces/errors.interface';

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
