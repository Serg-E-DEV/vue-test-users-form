import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { nanoid } from 'nanoid';
import { AccountInterface } from '@/interfaces/account.interface';
import { stringToRecordLabels } from '@/modules/utils';

const ACCOUNTS_STORAGE_KEY = 'accounts-storage';

export const useAccountsStore = defineStore('AccountsStore', () => {
  const accounts = ref<AccountInterface[]>([]);

  function loadAccounts() {
    const accountsData = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (!accountsData) {
      return;
    }
    try {
      accounts.value = JSON.parse(accountsData);
    } catch (e) {
      accounts.value = [];
      console.error(e);
    }
  }

  function saveAccounts() {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts.value));
  }

  function createAccount() {
    const newAccount: AccountInterface = {
      id: nanoid(),
      recordLabels: stringToRecordLabels('AAA; BBB; CCC'),
      recordType: 'local',
      login: 'Значение',
      password: '1',
    };

    accounts.value.push(newAccount);
    saveAccounts();
  }
  function removeAccount(id: string) {
    if (!id) {
      return;
    }
    accounts.value = accounts.value.filter((account) => account.id !== id);
  }

  function updateAccount(updatedAccount: AccountInterface) {
    accounts.value = accounts.value.map((account: AccountInterface) =>
      account.id === updatedAccount.id
        ? {
            ...updatedAccount,
          }
        : account
    );
  }

  watch(accounts, saveAccounts, { deep: true });

  loadAccounts();

  return {
    accounts,
    createAccount,
    removeAccount,
    updateAccount,
  };
});
