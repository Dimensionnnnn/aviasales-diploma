import { DefaultListEmpty } from '../default-list-empty/default-list-empty';

interface DataHandlerProps {
  data?: any[] | null;
  isWithHeader: boolean;
  children: React.ReactNode;
}

export const DataHandler = ({ data, isWithHeader = false, children }: DataHandlerProps) => {
  if (!data?.length) {
    return <DefaultListEmpty isWithHeader={isWithHeader} />;
  }

  return children;
};
