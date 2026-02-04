<script setup lang="ts">
import RowsInput from '@/shared/ui/RowsInput.vue';
import IconButton from '@/shared/ui/IconButton.vue';
import PasswordField from '@/shared/ui/PasswordField.vue';
import BaseInput from '@/shared/ui/BaseInput.vue';
import BaseSelect from '@/shared/ui/BaseSelect.vue';

import { FormInterface } from '@/features/accounts/types/form.interface';
import { ErrorsInterface } from '@/features/accounts/types/errors.interface';
import { AccountInterface } from '@/features/accounts/types/account.interface';

import { computed, reactive, watch } from 'vue';
import { useAccountsStore } from '@/features/accounts/stores/accounts.store';
import {
  normalizeLabelsInput,
  normalizeLoginInput,
  normalizePasswordInput,
  stringToRecordLabels,
} from '@/features/accounts/libs/accountUtils';
import { validateForm } from '@/features/accounts/libs/validateForm';

interface Props {
  account: AccountInterface;
}

const props = defineProps<Props>();

const accountsStore = useAccountsStore();

const recordTypeOptions = [
  { selectLabel: 'Локальная', selectValue: 'local' },
  { selectLabel: 'LDAP', selectValue: 'ldap' },
];

const form = reactive<FormInterface>({
  recordLabels: props.account.recordLabels.map((label) => label.text).join('; '),
  recordType: props.account.recordType,
  login: props.account.login,
  password: props.account.password,
});

const errors = reactive<ErrorsInterface>({
  login: false,
  password: false,
  recordType: false,
});

function onRemove() {
  accountsStore.removeAccount(props.account.id);
}

function updateIfValid() {
  if (!validateForm(form, errors)) {
    return;
  }

  accountsStore.updateAccount({
    id: props.account.id,
    ...form,
    recordLabels: stringToRecordLabels(form.recordLabels),
    validated: true,
  });
}

watch(
  () => form.recordType,
  (newType) => {
    if (newType === 'ldap') {
      form.password = null;
    }
  }
);

const recordLabelsModel = computed({
  get: () => form.recordLabels ?? '',
  set: (val: string) => {
    form.recordLabels = val;
  },
});

const passwordModel = computed({
  get: () => form.password ?? '',
  set: (val: string) => (form.password = val),
});
</script>

<template>
  <div class="account-row">
    <RowsInput
      v-model="recordLabelsModel"
      placeholder="Введите метку"
      class="account-row__item"
      name="record-label"
      maxlength="50"
      @blur="
        recordLabelsModel = normalizeLabelsInput(recordLabelsModel);
        updateIfValid();
      "
    />
    <BaseSelect
      v-model="form.recordType"
      class="account-row__item"
      :select-options="recordTypeOptions"
      name="record-type"
      @change="updateIfValid()"
    />
    <BaseInput
      v-model="form.login"
      :class="['account-row__item', { 'account-row__item_double': form.recordType === 'ldap' }]"
      placeholder="Введите логин"
      name="login"
      maxlength="100"
      :error="errors.login"
      @blur="
        form.login = normalizeLoginInput(form.login);
        updateIfValid();
      "
    />
    <PasswordField
      v-if="form.recordType !== 'ldap'"
      v-model="passwordModel"
      class="account-row__item"
      name="password"
      :maxlength="100"
      :error="errors.password"
      @blur="
        form.password = normalizePasswordInput(form.password);
        updateIfValid();
      "
    />
    <IconButton icon="trash" @click="onRemove" />
  </div>
</template>

<style scoped></style>
