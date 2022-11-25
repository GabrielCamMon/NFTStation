import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStoreAccount = create(
  persist((set) => ({
    accountWeb3: '',
    setAccountWeb3: (accountData) =>
      set({
        accountWeb3: accountData,
      }),
    removeAccountWeb3: () =>
      set({
        accountWeb3: '',
      }),
  })),
)
export default useStoreAccount
