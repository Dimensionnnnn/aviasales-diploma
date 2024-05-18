import { API_AUTOCOMPLETE_URL, URL_AVS_ICO, URL_AVS_ICO_SMALL, URL_OPEN } from '@env';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useState } from 'react';
import { Image, Linking } from 'react-native';

import { RootRouteNames, RootStackParamList } from '@app/navigation/tab-navigator/tab-navigator';

import { SecondaryHeader } from '@widgets/layouts/secondary-header/secondary-header';

import { useAppDispatch, useAppSelector } from '@shared/store';
import { actions as favoriteTicketsActions } from '@shared/store/ducks/favorite-tickets';
import { FavoriteTicketParams } from '@shared/store/ducks/favorite-tickets/slice';
import { SpecialOffer } from '@shared/store/ducks/special-offer/slice';
import { PricesForDatesType } from '@shared/store/ducks/tickets-by-dates/slice';
import { ButtonIcon } from '@shared/ui/buttons/button-icon/button-icon';
import { PrimaryButton } from '@shared/ui/buttons/primary-button/primary-button';
import { SvgHeartIcon } from '@shared/ui/icons/components/svg-heart-icon';
import { SvgOutlineHeartIcon } from '@shared/ui/icons/components/svg-outline-heart-icon';

import {
  ButtonContainer,
  ImageSmall,
  StyledContainer,
  StyledContentContainer,
  TicketContainer,
  TicketInfoContainer,
  TicketItem,
  TicketItemDate,
  TicketItemTime,
  TicketItemTitle,
  TicketTime,
  TicketTimeWrapper,
  TicketTitle,
} from './ui/components';

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.locale('ru');

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const isPricesForDatesType = (
  ticket: SpecialOffer | PricesForDatesType,
): ticket is PricesForDatesType => {
  return (ticket as SpecialOffer).airline_title === undefined;
};

function formatDepartureTime(departureTime: string): any {
  const date = dayjs(departureTime);
  const formattedDayOfWeek = capitalizeFirstLetter(date.format('dddd'));
  const formattedDate = date.format('D MMMM');
  let formattedTime = date.format('h.mm A');

  formattedTime = formattedTime.replace('AM', 'am').replace('PM', 'pm');

  return {
    day: formattedDayOfWeek,
    date: formattedDate,
    time: formattedTime,
  };
}

function formatDuration(durationInMinutes: number): string {
  const minutesInDay = 1440;
  const minutesInHour = 60;

  const days = Math.floor(durationInMinutes / minutesInDay);
  const hours = Math.floor((durationInMinutes % minutesInDay) / minutesInHour);
  const minutes = durationInMinutes % minutesInHour;

  let formattedDuration = '';
  if (days > 0) formattedDuration += `${days}д `;
  if (hours > 0) formattedDuration += `${hours}ч `;
  if (minutes >= 10) formattedDuration += `${minutes}м`;
  else if (days === 0 && hours === 0) formattedDuration += `${minutes}м`;

  return formattedDuration.trim();
}

export const TicketPage = () => {
  const route = useRoute<RouteProp<RootStackParamList, RootRouteNames.TICKET>>();
  const props = route.params.ticket;
  const [cityFirst, setCityFirst] = useState('');
  const [citySecond, setCitySecond] = useState('');
  const [isLiked, setIsLiked] = useState(route.params.isFavorite ?? false);
  const isPricesForDates = isPricesForDatesType(props);
  const dispatch = useAppDispatch();

  const getCityName = (value: string, callbackCitySetter: (value: string) => void) => {
    return axios
      .get(API_AUTOCOMPLETE_URL, {
        params: {
          locale: 'ru',
          types: ['country', 'airport', 'city'],
          term: value,
        },
      })
      .then((response) => {
        callbackCitySetter(response.data[0].name);
      });
  };

  useEffect(() => {
    getCityName(props.origin, setCityFirst);
    getCityName(props.destination, setCitySecond);
  }, []);

  const handleClick = (ticketLink: string) => {
    Linking.openURL(`${URL_OPEN}${ticketLink}`);
  };

  const returnInfo = props as PricesForDatesType;

  const userId = useAppSelector((state) => state.auth.currentUser?.id);

  const ticketLike = () => {
    if (isPricesForDates) {
      if (userId) {
        const favoriteTicket: FavoriteTicketParams = {
          userId: userId,
          ...props,
        };

        dispatch(favoriteTicketsActions.likeTicket(favoriteTicket));
        setIsLiked(true);
      }
    }
  };

  const ticketUnlike = () => {
    if (isPricesForDates) {
      if (userId) {
        dispatch(
          favoriteTicketsActions.dislikeTicketByFlightNumber({
            userId: userId,
            flightNumber: props.flight_number,
          }),
        );
        setIsLiked(false);
      }
    }
  };

  const handleButtonLicke = () => {
    if (isLiked) {
      ticketUnlike();
    } else {
      ticketLike();
    }
  };

  return (
    <StyledContainer>
      <SecondaryHeader title="Билет" />
      <StyledContentContainer>
        <Image
          source={{ uri: `${URL_AVS_ICO}${props.airline}.png` }}
          style={{ width: 200, height: 200 }}
        />
        <TicketContainer>
          <TicketTitle>
            {cityFirst} - {citySecond}
          </TicketTitle>
          <TicketTime>{formatDuration(props.duration)} в пути</TicketTime>
          <TicketInfoContainer>
            <ImageSmall source={{ uri: `${URL_AVS_ICO_SMALL}${props.airline}.png` }} />
            <TicketTimeWrapper>
              <TicketItem>
                <TicketItemTitle>Вылетаем:</TicketItemTitle>
                <TicketItemTime>{formatDepartureTime(props.departure_at).time}</TicketItemTime>
                <TicketItemDate>
                  {formatDepartureTime(props.departure_at).day},{' '}
                  {formatDepartureTime(props.departure_at).date}
                </TicketItemDate>
              </TicketItem>

              {returnInfo.return_at && (
                <TicketItem>
                  <TicketItemTitle>Прилетаем:</TicketItemTitle>
                  <TicketItemTime>{formatDepartureTime(returnInfo.return_at).time}</TicketItemTime>
                  <TicketItemDate>
                    {formatDepartureTime(returnInfo.return_at).day},{' '}
                    {formatDepartureTime(returnInfo.return_at).date}
                  </TicketItemDate>
                </TicketItem>
              )}
            </TicketTimeWrapper>
          </TicketInfoContainer>
        </TicketContainer>
      </StyledContentContainer>
      <ButtonContainer>
        <PrimaryButton
          size={isPricesForDates ? 'medium' : 'large'}
          title="Подробнее"
          onPress={() => handleClick(props.link)}
        />
        {isPricesForDates && (
          <ButtonIcon
            Icon={isLiked ? SvgOutlineHeartIcon : SvgHeartIcon}
            onPress={handleButtonLicke}
          />
        )}
      </ButtonContainer>
    </StyledContainer>
  );
};
