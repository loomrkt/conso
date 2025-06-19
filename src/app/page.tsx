'use client';

import React from 'react';
import { Button as ShadcnButton } from '../components/ui/button';

export default function Home() {
  const DynamicButton = useRemoteComponent('StyledShadcnButton', { Button: ShadcnButton });
  
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Bouton distant</h1>

      {DynamicButton ? (
        <DynamicButton onClick={() => alert('Clique détecté !')}>
          <span className="font-semibold">Clique-moi</span>
        </DynamicButton>
      ) : (
        <p>Chargement du composant...</p>
      )}
    </div>
  );
}
