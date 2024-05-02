import { API_AUTOCOMPLETE_URL, URL_AVS_ICO, URL_AVS_ICO_SMALL, URL_OPEN } from '@env';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useState } from 'react';
import { Image, Linking } from 'react-native';
import styled, { css } from 'styled-components/native';

import { RootRouteNames, RootStackParamList } from '@app/navigation/tab-navigator/tab-navigator';

import { SecondaryHeader } from '@widgets/layouts/secondary-header/secondary-header';

import { PricesForDatesType } from '@shared/store/ducks/tickets-by-dates/slice';
import { PrimaryButton } from '@shared/ui/buttons/primary-button/primary-button';

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.locale('ru');

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        <PrimaryButton size="large" title="Подробнее" onPress={() => handleClick(props.link)} />
      </ButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.grayscale_200};
  position: relative;
`;

const StyledContentContainer = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 16px 0 14px;
`;

const TicketInfoContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.grayscale_500};
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
`;

const TicketItem = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const TicketItemTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineRegular_18};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;

const TicketItemDate = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_14};
      color: ${props.theme.colors.grayscale_700};
    `;
  }}
`;

const TicketItemTime = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_16};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;

const TicketTitle = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.headlineSemibold_20};
      color: ${props.theme.colors.grayscale_800};
    `;
  }}
`;

const TicketTime = styled.Text`
  ${(props) => {
    return css`
      ${props.theme.typography.bodyRegular_16};
      color: ${props.theme.colors.grayscale_700};
    `;
  }}
`;

const TicketTimeWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const TicketContainer = styled.View`
  width: 100%;
`;

const ImageSmall = styled.Image`
  width: 150px;
  height: 100px;
  margin-left: 16px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
