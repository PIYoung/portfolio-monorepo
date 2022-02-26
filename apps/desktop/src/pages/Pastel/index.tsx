import PastelHeader from '../../components/organisms/PastelHeader';
import PastelMain from '../../components/organisms/PastelMain';
import PastelNavigation from '../../components/organisms/PastelNavigation';
import React from 'react';

export default function Pastel() {
  return (
    <div>
      <PastelNavigation />
      <PastelHeader />
      <PastelMain />
    </div>
  );
}
