import { Main } from '@pages/main/main';

// import { SelfDeskPage } from '@pages/self-desk';
// import { FollowedPage } from '@pages/followed';
// import { UIKit } from '@pages/ui-kit/ui-kit';
// import { UsersDeskPage } from '@pages/users-desks';
import { TabBarIconsNames, getTabBarIcon } from '@shared/helpers/tab-bar-icons/tab-bar-icons';
import { BottomTabBar, Tab } from '@shared/ui/bottom-tabbar/bottom-tabbar';

export const TabBar = () => {
  return (
    <BottomTabBar>
      <Tab.Screen
        name={TabBarIconsNames.MAIN}
        component={Main}
        options={({ route }) => ({
          tabBarLabel: TabBarIconsNames.MAIN,
          tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        })}
      />
      {/* <Tab.Screen
        name={TabBarIconsNames.USERS_DESKS}
        component={UsersDeskPage}
        options={({ route }) => ({
          tabBarLabel: TabBarIconsNames.USERS_DESKS,
          tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        })}
      />
      <Tab.Screen
        name={TabBarIconsNames.FOLLOWED}
        component={FollowedPage}
        options={({ route }) => ({
          tabBarLabel: TabBarIconsNames.FOLLOWED,
          tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        })}
      />
      <Tab.Screen
        name={TabBarIconsNames.UI_KIT}
        component={UIKit}
        options={({ route }) => ({
          tabBarLabel: TabBarIconsNames.UI_KIT,
          tabBarIcon: ({ color }) => getTabBarIcon(route.name, color),
        })}
      /> */}
    </BottomTabBar>
  );
};
