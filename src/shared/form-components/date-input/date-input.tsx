import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

import { TextButton } from '@shared/ui/buttons/text-button/text-button';

interface Props {
  titleButton: string;
  value?: Date;
  handleConfirm: (date?: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const FormDateInput: React.FC<Props> = ({
  titleButton,
  value,
  handleConfirm,
  minimumDate,
  maximumDate,
}) => {
  const [isDateTimeModalVisible, setIsDateTimeModalVisible] = useState(false);
  return (
    <>
      <TextButton title={titleButton} onPress={() => setIsDateTimeModalVisible(true)} />
      {isDateTimeModalVisible && (
        <DateTimePicker
          value={value || new Date()}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={(_, date) => {
            handleConfirm(date);
            setIsDateTimeModalVisible(false);
          }}
        />
      )}
    </>
  );
};
