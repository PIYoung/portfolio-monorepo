import { PastelState } from '../reducers/pastel.reducer';
import { colors } from './colors';
import { paletts } from './paletts';

export const initialPastelState: PastelState = {
  paletts,
  colors,
  selectedMenu: {
    uid: 1,
    iconKey: 1,
    title: 'All Paletts',
    to: 'all-paletts',
    removable: false,
  },
  selectedHex: '#ffffff',
  menus: [
    {
      uid: 0,
      iconKey: 0,
      title: 'Library',
      removable: false,
      children: [
        {
          uid: 1,
          iconKey: 1,
          title: 'All Paletts',
          to: 'all-paletts',
          removable: false,
        },
        {
          uid: 2,
          iconKey: 2,
          title: 'Recents',
          to: 'recents',
          removable: false,
        },
        {
          uid: 3,
          iconKey: 3,
          title: 'Colors',
          to: 'colors',
          removable: false,
        },
      ],
    },
    {
      uid: 4,
      iconKey: 0,
      title: 'Collections',
      removable: false,
      children: [
        {
          uid: 5,
          iconKey: 4,
          title: 'Themes',
          to: 'themes',
          removable: true,
        },
        {
          uid: 6,
          iconKey: 4,
          title: 'Reference',
          to: 'reference',
          removable: true,
        },
      ],
    },
  ],
};
