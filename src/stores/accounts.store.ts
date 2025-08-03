import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { nanoid } from 'nanoid';
import { AccountInterface } from '@/interfaces/account.interface';

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
      recordLabel: 'XXX; YYYY; II; MMM',
      recordType: 'local',
      login: '',
      password: '',
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
    accounts.value = accounts.value.map((account) =>
      account.id === updatedAccount.id ? { ...updatedAccount } : account
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
