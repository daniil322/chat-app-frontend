import { RootStore } from './RootStore'
import { useContext } from 'react';
import { StoreContext } from './stores';



export const useStore = (): RootStore => useContext(StoreContext);