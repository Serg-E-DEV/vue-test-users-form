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
    const validatedAccounts: AccountInterface[] = accounts.value.filter(
      (account: AccountInterface) => account.validated
    );
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(validatedAccounts));
  }

  function createAccount() {
    const newAccount: AccountInterface = {
      id: nanoid(),
      recordLabels: stringToRecordLabels(''),
      recordType: 'local',
      login: '',
      password: '',
      validated: false,
    };

    accounts.value.push(newAccount);
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
