<script setup lang="ts">
import RowsInput from '@/components/RowsInput.vue';
import IconButton from '@/components/IconButton.vue';
import PasswordField from '@/components/passwordField.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';

import { ref, watch } from 'vue';
import { FormInterface } from '@/interfaces/form.interface';

const recordTypeOptions = [
  { selectLabel: 'Локальная', selectValue: 'local' },
  { selectLabel: 'LDAP', selectValue: 'ldap' },
];

const form = ref<FormInterface>({
  recordType: recordTypeOptions[0].selectValue,
});

watch(
  () => form.value.recordType,
  (newType) => {
    if (newType === 'ldap') {
      form.value.password = null;
    }
  }
);
</script>

<template>
  <div class="account-row">
    <RowsInput
      v-model="form.recordLabel"
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
    <IconButton icon="trash" />
  </div>
</template>

<style scoped></style>
