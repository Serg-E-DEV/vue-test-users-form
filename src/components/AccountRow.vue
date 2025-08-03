<script setup lang="ts">
import RowsInput from '@/components/RowsInput.vue';
import IconButton from '@/components/IconButton.vue';
import PasswordField from '@/components/passwordField.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import { reactive, watch } from 'vue';
import { useAccountsStore } from '@/stores/accounts.store';
import { stringToRecordLabels } from '@/modules/utils';
import { FormInterface } from '@/interfaces/form.interface';
import { AccountInterface } from '@/interfaces/account.interface';

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

function onRemove() {
  accountsStore.removeAccount(props.account.id);
}

watch(
  () => ({ ...form }),
  (changedForm) => {
    accountsStore.updateAccount({
      id: props.account.id,
      ...changedForm,
      recordLabels: stringToRecordLabels(changedForm.recordLabels),
    });
  },
  { deep: true }
);

watch(
  () => form.recordType,
  (newType) => {
    if (newType === 'ldap') {
      form.password = null;
    }
  }
);
</script>

<template>
  <div class="account-row">
    <RowsInput
      v-model="form.recordLabels"
      placeholder="Введите метку"
      class="account-row__item"
      name="record-label"
      maxlength="50"
    />
    <BaseSelect v-model="form.recordType" :options="recordTypeOptions" />
    <BaseInput
      v-model="form.login"
      :class="['account-row__item', { 'account-row__item_double': form.recordType === 'ldap' }]"
      placeholder="Введите логин"
      name="login"
      maxlength="100"
      required
    />
    <PasswordField
      v-if="form.recordType !== 'ldap'"
      v-model="form.password"
      class="account-row__item"
      name="password"
      maxlength="100"
      required
    />
    <IconButton icon="trash" @click="onRemove" />
  </div>
</template>

<style scoped></style>
