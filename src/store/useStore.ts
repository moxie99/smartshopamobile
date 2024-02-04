import create from 'zustand';

export interface StoreProps {
  accountOpeningData: any;
  addProduct: any;
  setAddProduct: (data: any) => void;
  setAccountOpeningData: (data: any) => void;
  setBvnData: (data: any) => void;
  tierOneSuccess: any;
  setTierOneSuccess: (data: any) => void;
  userData: any;
  bvnData: any;
  setUserData: (data: any) => void;
}

const useStore = create<StoreProps>((set) => ({
  accountOpeningData: {},
  addProduct: {},
  tierOneSuccess: { isSuccess: false, content: '' },
  userData: {},
  bvnData: {},
  setAccountOpeningData: (data: any) =>
    set((state) => ({ accountOpeningData: data })),
  setAddProduct: (data: any) => set((state) => ({ addProduct: data })),
  setBvnData: (data: any) => set((state) => ({ bvnData: data })),
  setTierOneSuccess: (data: any) => set((state) => ({ tierOneSuccess: data })),
  setUserData: (data: any) => set((state) => ({ userData: data })),
}));

export default useStore;
