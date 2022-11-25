export const useStoreAccount = (set) => ({
  accountWeb3: '',
  setAccountWeb3: (accountData) => set({ accountWeb3: accountData }),
  removeAccountWeb3: () => set({ accountWeb3: '' }),
})
