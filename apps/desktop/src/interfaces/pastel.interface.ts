import React from 'react';

export interface NavigationMenu {
  uid: number;
  iconKey: number;
  title: string;
  children?: NavigationMenu[];
  to?: string;
  removable: boolean;
  isDetail?: boolean;
}

export interface Color {
  title: string;
  hex: string;
}

export interface Paletts {
  id: number;
  title: string;
  uid: number;
  colors: Omit<Color, 'title'>[];
  lastVisited?: Date;
  removable: boolean;
}
