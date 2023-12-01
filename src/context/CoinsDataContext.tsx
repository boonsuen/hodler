import { DataSource } from '@/types';
import { Dispatch, SetStateAction, createContext } from 'react';

export type CoinsDataContextType = {
  data: any;
  isLoading: boolean;
  activeDataSource: DataSource;
  setActiveDataSource: Dispatch<SetStateAction<DataSource>>;
};

export const CoinsDataContext = createContext<CoinsDataContextType | null>(
  null
);
