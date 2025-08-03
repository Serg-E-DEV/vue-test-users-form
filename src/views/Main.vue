<script setup lang="ts">
import SpriteIcon from '@/components/SpriteIcon.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import IconButton from '@/components/IconButton.vue';
import PasswordField from '@/components/passwordField.vue';

import { ref } from 'vue';
import { FormInterface } from '@/interfaces/form.interface';
import BaseSelect from '@/components/BaseSelect.vue';
import RowsInput from '@/components/RowsInput.vue';

const recordTypeOptions = [
  { selectLabel: 'Локальная', selectValue: 'local' },
  { selectLabel: 'LDAP', selectValue: 'ldap' },
];

const form = ref<FormInterface>({
  recordType: recordTypeOptions[0].selectValue,
});
</script>

<template>
  <div class="page main-page section section_horizontal-indents">
    <main class="main-page__main">
      <section class="accounts-section">
        <div class="accounts-section__header">
          <h1 class="accounts-section__title">Учетные записи</h1>
          <BaseButton theme="ghost" shape="square">
            <SpriteIcon icon="add" />
          </BaseButton>
        </div>

        <div class="accounts-section__info">
          <span class="base-hint base-hint_theme_primary">
            <SpriteIcon icon="question" />
            Для указания нескольких меток для одной пары логин/пароль используйте разделитель " ; "
          </span>
        </div>

        <div class="accounts-section__rows">
          <div class="accounts-section__row accounts-section__row_head">
            <span class="accounts-section__row-item">Метки</span>
            <span class="accounts-section__row-item">Тип записи</span>
            <span class="accounts-section__row-item">Логин</span>
            <span class="accounts-section__row-item accounts-section__row-item_double">Пароль</span>
          </div>

          <div v-for="n in 3" :key="n" class="accounts-section__row">
            <RowsInput
              v-model="form.recordLabel"
              placeholder="Введите метку"
              name="label"
              required
            />
            <BaseSelect v-model="form.recordType" :options="recordTypeOptions" />
            <BaseInput
              v-model="form.login"
              :class="[
                'accounts-section__row-item',
                { 'accounts-section__row-item_double': n === 2 },
              ]"
              placeholder="Введите логин"
              name="login"
              required
            />
            <PasswordField
              v-if="n !== 2"
              v-model="form.password"
              class="accounts-section__row-item"
              required
            />
            <IconButton icon="trash" />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
