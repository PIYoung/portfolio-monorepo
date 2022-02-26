import React from 'react';

export interface NavigationMenu {
  iconKey: number;
  title: string;
  children?: NavigationMenu[];
  to?: string;
}
