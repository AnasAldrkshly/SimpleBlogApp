import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Blog Dashboard',
    group: true,
  },
  {
    title: 'Articles',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'New Article',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Articles Table',
        link: '/pages/tables/articles-table',
      },
    ],
  },
  {
    title: 'Configs',
    icon: 'grid-outline',
    children: [
      {
        title: 'Categories & Tags ',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Users & Roles',
        link: '/pages/tables/users-table',
      },
    ],
  },
];
