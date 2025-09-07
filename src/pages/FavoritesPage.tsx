import React from 'react';
import Container from '../components/Container';

export interface FavoritesPageProps {}

export default function FavoritesPage({}: FavoritesPageProps) {
  return (
    <div className='mt-[88px]'>
      <Container>
        <h1>FavoritesPage</h1>
      </Container>
    </div>
  );
}
