import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '@shared/store';
import { actions as authActions } from '@shared/store/ducks/auth';

import { SvgExitIcon } from '../icons/components/svg-exit-icon';
import { getStyles } from './styles';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.currentUser);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const styles = getStyles();

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.root.container}
      style={styles.containerBackgroundColor}
      {...props}
    >
      <DrawerItemList {...props} />
      <View>
        <View style={styles.root.userContainer}>
          <Text style={[styles.root.fontUserName, styles.colorText]}>
            {`Привет, ${user?.name}!` ?? 'Привет, незнакомец!'}
          </Text>
        </View>
        <DrawerItem
          label={'Выйти'}
          icon={SvgExitIcon}
          onPress={handleLogout}
          labelStyle={[styles.root.itemLabel, styles.root.fontItemLabel, styles.colorText]}
        />
      </View>
    </DrawerContentScrollView>
  );
};
