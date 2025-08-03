<script setup lang="ts">
import SpriteIcon from '@/components/SpriteIcon.vue';
import BaseButton from '@/components/BaseButton.vue';
import AccountRow from '@/components/AccountRow.vue';

import { useAccountsStore } from '@/stores/accounts.store';

const accountsStore = useAccountsStore();
</script>

<template>
  <div class="page main-page section section_horizontal-indents">
    <main class="main-page__main">
      <section class="accounts-section">
        <div class="accounts-section__header">
          <h1 class="accounts-section__title">Учетные записи</h1>
          <BaseButton theme="ghost" shape="square" @click="accountsStore.createAccount()">
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
          <div class="account-row account-row_head">
            <span class="account-row__item">Метки</span>
            <span class="account-row__item">Тип записи</span>
            <span class="account-row__item">Логин</span>
            <span class="account-row__item account-row__item_double">Пароль</span>
          </div>
          <AccountRow
            v-for="account in accountsStore.accounts"
            :key="account.id"
            :account="account"
            class="accounts-section__row"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped></style>
