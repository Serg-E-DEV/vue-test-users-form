import { defineStore } from 'pinia';
import { ref } from 'vue';
import { nanoid } from 'nanoid';
import { AccountInterface } from '@/interfaces/account.interface';

export const useAccountsStore = defineStore('AccountsStore', () => {
  const accounts = ref<AccountInterface[]>([]);

  function createAccount() {
    const newAccount: AccountInterface = {
      id: nanoid(),
      recordLabel: '',
      recordType: 'local',
      login: '',
      password: '',
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
    accounts.value = accounts.value.map((account) =>
      account.id === updatedAccount.id ? { ...updatedAccount } : account
    );
  }

  return {
    accounts,
    createAccount,
    removeAccount,
    updateAccount,
  };
});
