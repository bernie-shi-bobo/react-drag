export interface Item {
  id: string;
  name: string;
  group?: Item[];
  status?: string;
}
export const data1: Item[] = [
  {
    id: '1111',
    name: 'item1',
  },
  {
    id: '222',
    name: 'item222222',
  },
  {
    id: '1133311',
    name: 'item3',
  },
  {
    id: '44444',
    name: 'item4',
    group: [
      {
        id: '5555',
        name: 'group1',
      },
      {
        id: '6666',
        name: 'group2',
      },
    ],
  },
];

export const data2: Item[] = [
  {
    id: '33',
    name: 'item4',
  },
  {
    id: '22233',
    name: 'iutem555555',
  },
  {
    id: '1133311',
    name: 'item6',
  },
  // {
  //   id: '333',
  //   name: '按钮3',
  //   group: [
  //     {
  //       id: '5555',
  //       name: 'group1',
  //     },
  //     {
  //       id: '6666',
  //       name: 'group2',
  //     },
  //   ],
  // },
];
