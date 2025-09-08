import React, { useState } from 'react';
import Container from '../components/Container';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { nanniesRef } from '../utils/queryParams';
import { NannieCardInterface } from './NanniesPage';
import NannieCard from '../components/NannieCard';

export interface FavoritesPageProps {}

export default function FavoritesPage({ }: FavoritesPageProps) {
  const [favoritesNannies, setFavoritesNannies] = useState<NannieCardInterface[]>([]);
  const getFavorites = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const favRef = ref(db, `/users/${user.uid}/favorites`);
      const snapshot = await get(favRef);
      if (snapshot.exists()) {
        const favoritesObj = snapshot.val(); // { productId1: true, productId2: true }
        const favorites = Object.keys(favoritesObj); // ["productId1", "productId2"]
        favorites.forEach(async (id) => {
          const snapshot = await get(
            query(nanniesRef, orderByChild('id'), equalTo(id)),
          );
          if (snapshot.exists()) {
           setFavoritesNannies(prev=> [...prev, (snapshot.val()[id] as NannieCardInterface)]);
          }
        });
      } else {
        console.log('У користувача немає улюблених товарів');
      }
    }
  };

  console.log(favoritesNannies);
  
  return (
    <div className='mt-[88px]'>
      <Container>
        <h1 onClick={getFavorites} className='text-lg'>
          FavoritesPage
        </h1>
        <ul className='flex flex-col gap-8 pb-16 pt-8'>
          {favoritesNannies.map((item: NannieCardInterface) => (
            <li
              key={item.id}
              className='bg-[#fbfbfb] p-6 rounded-3xl flex gap-6 relative'
            >
              <NannieCard item={item} />
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
