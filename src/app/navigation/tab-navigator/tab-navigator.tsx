import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PrimaryTicketsSearch } from '@pages/primary-tickets-search/primary-tickets-search';
import { TabBar } from '@pages/tab-bar/tab-bar';
import { TicketPage } from '@pages/ticket/ticket';

import { SpecialOffer } from '@shared/store/ducks/special-offer/slice';
import { PricesForDatesType } from '@shared/store/ducks/tickets-by-dates/slice';

const Stack = createNativeStackNavigator();

type TicketRouteParams = {
  ticket: SpecialOffer | PricesForDatesType;
};

export type TicketsRouteParams = {
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
};

export type RootStackParamList = {
  [RootRouteNames.TAB_BAR]: undefined;
  [RootRouteNames.TICKETS]: TicketsRouteParams;
  [RootRouteNames.TICKET]: TicketRouteParams;
};

export enum RootRouteNames {
  TAB_BAR = 'tab-bar',
  TICKET = 'ticket',
  TICKETS = 'tickets',
}

export const TabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name={RootRouteNames.TAB_BAR}
          component={TabBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RootRouteNames.TICKET}
          component={TicketPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RootRouteNames.TICKETS}
          component={PrimaryTicketsSearch}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
