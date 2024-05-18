import { SvgFollowedIcon } from '@shared/ui/icons/components/svg-followed-icon';
import { SvgHeartIcon } from '@shared/ui/icons/components/svg-heart-icon';
import { SvgHomeIcon } from '@shared/ui/icons/components/svg-home-icon';
import { SvgMyDeskIcon } from '@shared/ui/icons/components/svg-my-desk-icon';
import { SvgUsersDesksIcon } from '@shared/ui/icons/components/svg-users-desks-icon';

export enum TabBarIconsNames {
  MAIN = 'Авиабилеты',
  USERS_DESKS = 'Users desks',
  FOLLOWED = 'Followed',
  UI_KIT = 'UI Kit',
  FAVORITE_TICKETS = 'Избранное',
}

export const getTabBarIcon = (name: string, color: string) => {
  switch (name) {
    case TabBarIconsNames.MAIN:
      return <SvgHomeIcon color={color} />;
    case TabBarIconsNames.FAVORITE_TICKETS:
      return <SvgHeartIcon color={color} />;
    case TabBarIconsNames.USERS_DESKS:
      return <SvgUsersDesksIcon color={color} />;
    case TabBarIconsNames.FOLLOWED:
      return <SvgFollowedIcon color={color} />;
    case TabBarIconsNames.UI_KIT:
      return <SvgMyDeskIcon color={color} />;
    default:
      return <SvgMyDeskIcon color={color} />;
  }
};
