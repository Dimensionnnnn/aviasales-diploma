import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';

import { TabBar } from '@pages/tab-bar/tab-bar';

import { DrawerContent } from '@shared/ui/drawer-content/drawer-content';

const Drawer = createDrawerNavigator();

export const CustromDrawer = () => (
  <View style={{ flex: 1 }}>
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen
        name="BottomTab"
        component={TabBar}
        options={{ headerShown: false, drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  </View>
);
