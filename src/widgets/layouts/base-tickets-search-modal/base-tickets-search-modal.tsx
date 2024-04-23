import { API_AUTOCOMPLETE_URL, TOKEN } from '@env';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Modal } from 'react-native';

import { FormInput } from '@shared/form-components/inputs/form-input/form-input';
import { useDebounce } from '@shared/hooks/use-debounce';
import { useAppDispatch } from '@shared/store';
import { actions } from '@shared/store/ducks/cheap-tickets';
import { ApiParams } from '@shared/store/ducks/cheap-tickets/thunks';
import { AirportData } from '@shared/types/airport-data';
import { ButtonIcon } from '@shared/ui/buttons/button-icon/button-icon';
import { TextPressable } from '@shared/ui/buttons/text-pressable/text-pressable';
import { SvgCloseIcon } from '@shared/ui/icons/components/svg-close-icon';

import {
  StyledAutoCompleteContent,
  StyledAutoCompleteItem,
  StyledButtonModalClose,
  StyledContainer,
  StyledModalContainer,
  StyledModalInputContainer,
  StyledScrollView,
} from './ui/components';

type InputNameType = 'departure' | 'destination';

type FormData = {
  departure: string;
  destination: string;
};

interface Suggestion {
  city_name: string;
  name: string;
  code: string;
  country_name: string;
  id: string;
}

const determineLocale = (value: string) => {
  return /[а-яА-Я]/.test(value) ? 'ru' : 'en';
};

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onCloseWithNextOpen: () => void;
}

export const BaseTicketsSearchModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onCloseWithNextOpen,
}) => {
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      departure: '',
      departureCode: '',
      destination: '',
      destinationCode: '',
    },
  });

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [activeInput, setActiveInput] = useState('');
  const [formData, setFormData] = useState<FormData>({
    departure: '',
    destination: '',
  });

  const dispatch = useAppDispatch();

  const debouncedDeparture = useDebounce(formData.departure, 400);
  const debouncedDestination = useDebounce(formData.destination, 400);

  const onSubmit = (dataSubmit: any) => {
    reset();

    const params: ApiParams = {
      currency: 'RUB',
      period_type: 'year',
      page: 1,
      limit: 10,
      show_to_affiliates: true,
      sorting: 'price',
      token: TOKEN,
      origin: dataSubmit.departureCode,
      destination: dataSubmit.destinationCode,
      one_way: false,
    };

    dispatch(actions.getCheapTickets(params));

    onCloseWithNextOpen();
    Keyboard.dismiss();
  };

  const fetchSuggestions = async (inputName: InputNameType, value: string) => {
    const determinedLocale = determineLocale(value);
    axios
      .get(API_AUTOCOMPLETE_URL, {
        params: {
          locale: determinedLocale,
          types: ['country', 'airport', 'city'],
          term: value,
        },
      })
      .then((response) => {
        setSuggestions([]);
        const result: AirportData[] = response.data;
        result.forEach((item) => {
          const { city_name, code, country_name, id, name } = item;

          setSuggestions((prevSuggestions) => [
            ...prevSuggestions,
            { city_name, code, country_name, id, name },
          ]);
        });
      })
      .catch((error) => {
        console.error(error);
      });

    setActiveInput(inputName);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    reset({
      ...getValues(),
      [activeInput]: suggestion.name,
      [`${activeInput}Code`]: suggestion.code,
    });
    setSuggestions([]);

    const values = getValues();
    if (values.departureCode && values.destinationCode) {
      handleSubmit(onSubmit)();
    }
  };

  const handleChange = (inputName: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [inputName]: value }));
  };

  const handleClose = () => {
    setFormData({ departure: '', destination: '' });
    setSuggestions([]);
    reset({ departure: '', destination: '', departureCode: '', destinationCode: '' });
    setActiveInput('');
    onClose();
  };

  useEffect(() => {
    if (debouncedDeparture) {
      fetchSuggestions('departure', debouncedDeparture);
    }
  }, [debouncedDeparture]);

  useEffect(() => {
    if (debouncedDestination) {
      fetchSuggestions('destination', debouncedDestination);
    }
  }, [debouncedDestination]);

  return (
    <StyledContainer>
      <Modal animationType="slide" visible={isVisible}>
        <StyledModalContainer>
          <StyledButtonModalClose>
            <ButtonIcon Icon={SvgCloseIcon} onPress={handleClose} />
          </StyledButtonModalClose>
          <StyledModalInputContainer>
            <Controller
              control={control}
              name="departure"
              render={(renderProps) => (
                <FormInput
                  label="Откуда"
                  {...renderProps}
                  placeholder="Откуда - Омск"
                  autoFocus={true}
                  onChange={(e) => {
                    renderProps.field.onChange(e);
                    handleChange('departure')(e.nativeEvent.text);
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="destination"
              render={(renderProps) => (
                <FormInput
                  label="Куда"
                  {...renderProps}
                  placeholder="Куда - Москва"
                  onChange={(e) => {
                    renderProps.field.onChange(e);
                    handleChange('destination')(e.nativeEvent.text);
                  }}
                />
              )}
            />
          </StyledModalInputContainer>

          <StyledScrollView>
            <StyledAutoCompleteContent>
              {suggestions.map((suggestion) => (
                <StyledAutoCompleteItem key={suggestion.id}>
                  <TextPressable
                    title={suggestion.name + ' - ' + suggestion.code}
                    onPress={() => handleSuggestionClick(suggestion)}
                  />
                </StyledAutoCompleteItem>
              ))}
            </StyledAutoCompleteContent>
          </StyledScrollView>
        </StyledModalContainer>
      </Modal>
    </StyledContainer>
  );
};
