<script setup lang="ts">
import RowsInput from '@/components/RowsInput.vue';
import IconButton from '@/components/IconButton.vue';
import PasswordField from '@/components/PasswordField.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import { FormInterface } from '@/interfaces/form.interface';
import { AccountInterface } from '@/interfaces/account.interface';
import { ErrorsInterface } from '@/interfaces/errors.interface';

import { computed, reactive, watch } from 'vue';
import { useAccountsStore } from '@/stores/accounts.store';
import {
  normalizeLabelsInput,
  normalizeLoginInput,
  normalizePasswordInput,
  stringToRecordLabels,
} from '@/modules/utils';
import { validateForm } from '@/modules/validateForm';

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
  recordLabels: false,
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
      :error="errors.recordLabels"
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
      maxlength="100"
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
