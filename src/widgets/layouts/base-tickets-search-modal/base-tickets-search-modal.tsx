import { API_AUTOCOMPLETE_URL, TOKEN } from '@env';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Modal } from 'react-native';

import { FormInput } from '@shared/form-components/inputs/form-input/form-input';
import { useDebounce } from '@shared/hooks/use-debounce';
import { useAppDispatch } from '@shared/store';
import { actions } from '@shared/store/ducks/special-offer';
import { SpecialOffersParams } from '@shared/store/ducks/special-offer/thunks';
import { AirportData } from '@shared/types/airport-data';
import { ButtonIcon } from '@shared/ui/buttons/button-icon/button-icon';
import { TextPressable } from '@shared/ui/buttons/text-pressable/text-pressable';
import { SvgCloseIcon } from '@shared/ui/icons/components/svg-close-icon';
import { Spinner } from '@shared/ui/spinner/spinner';

import {
  StyledAutoCompleteContent,
  StyledAutoCompleteItem,
  StyledButtonModalClose,
  StyledContainer,
  StyledModalContainer,
  StyledModalInputContainer,
  StyledScrollView,
  StyledSpinnerContainer,
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
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    departure: '',
    destination: '',
  });

  const dispatch = useAppDispatch();

  const debouncedDeparture = useDebounce(formData.departure, 400);
  const debouncedDestination = useDebounce(formData.destination, 400);

  const onSubmit = (dataSubmit: any) => {
    reset();

    const params: SpecialOffersParams = {
      origin: dataSubmit.departureCode,
      destination: dataSubmit.destinationCode,
      locale: 'ru',
      token: TOKEN,
    };

    dispatch(actions.getSpecialOffers(params));

    handleReset();
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

        setIsLoading(false);
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

  const handleReset = () => {
    setFormData({ departure: '', destination: '' });
    setSuggestions([]);
    reset({ departure: '', destination: '', departureCode: '', destinationCode: '' });
    setActiveInput('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  useEffect(() => {
    if (debouncedDeparture) {
      fetchSuggestions('departure', debouncedDeparture);
    }

    setSuggestions([]);
    setIsLoading(false);
  }, [debouncedDeparture]);

  useEffect(() => {
    if (debouncedDestination) {
      fetchSuggestions('destination', debouncedDestination);
    }

    setSuggestions([]);
    setIsLoading(false);
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
                    setIsLoading(true);
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
                    setIsLoading(true);
                    handleChange('destination')(e.nativeEvent.text);
                  }}
                />
              )}
            />
          </StyledModalInputContainer>

          <StyledScrollView>
            <StyledAutoCompleteContent>
              {isLoading ? (
                <StyledSpinnerContainer>
                  <Spinner color="#000" stroke="#fff" />
                </StyledSpinnerContainer>
              ) : (
                suggestions.map((suggestion) => (
                  <StyledAutoCompleteItem key={suggestion.id}>
                    <TextPressable
                      title={suggestion.name + ' - ' + suggestion.code}
                      onPress={() => handleSuggestionClick(suggestion)}
                    />
                  </StyledAutoCompleteItem>
                ))
              )}
            </StyledAutoCompleteContent>
          </StyledScrollView>
        </StyledModalContainer>
      </Modal>
    </StyledContainer>
  );
};
