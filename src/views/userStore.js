import {create} from 'zustand'

const useUserStore = create((set) => ({
  authenticatedUser: {},
  setAuthenticatedUser: (user) => {
    console.log(user)
    set({authenticatedUser: user})
  },
}))

export default useUserStore;