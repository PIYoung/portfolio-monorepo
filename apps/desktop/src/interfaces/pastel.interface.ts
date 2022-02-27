import React from 'react';

export interface NavigationMenu {
  uid: number;
  iconKey: number;
  title: string;
  children?: NavigationMenu[];
  to?: string;
  removable: boolean;
}

export interface Color {
  title: string;
  hex: string;
}
