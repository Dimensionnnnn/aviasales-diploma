import { StyleSheet } from 'react-native';

import { FavoriteTickets } from '@pages/favorite-tickets/favorite-tickets';
import { Main } from '@pages/main/main';

import { TabBarIconsNames, getTabBarIcon } from '@shared/helpers/tab-bar-icons/tab-bar-icons';
import { BottomTabBar, Tab } from '@shared/ui/bottom-tabbar/bottom-tabbar';

export const TabBar = () => {
  return (
    <BottomTabBar>
      <Tab.Screen
        name={TabBarIconsNames.MAIN}
        component={Main}
        options={({ route }) => ({
          tabBarLabelStyle: styles.label,
          tabBarLabel: TabBarIconsNames.MAIN,
          tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        })}
      />
      <Tab.Screen
        name={TabBarIconsNames.FAVORITE_TICKETS}
        component={FavoriteTickets}
        options={({ route }) => ({
          tabBarLabelStyle: styles.label,
          tabBarLabel: TabBarIconsNames.FAVORITE_TICKETS,
          tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        })}
      />
    </BottomTabBar>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
  },
});
