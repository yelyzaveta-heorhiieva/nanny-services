import React, { useEffect, useRef, useState } from 'react';
import Container from '../components/Container';
import {
  ref,
  get,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';
import { db } from '../../firebase';
import NannieCard from '../components/NannieCard';
import toast from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';
import Loader from '../components/Loader';

export interface NanniesPageProps {}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface NannieCardInterface {
  id: string;
  name: string;
  avatar_url: string;
  birthday: string;
  experience: string;
  reviews: Review[];
  education: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  characters: string[];
  rating: number;
}

export default function NanniesPage({}: NanniesPageProps) {
  const [nannies, setNannies] = useState<NannieCardInterface[]>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const PAGE_SIZE = 2;

  const fetchNextPage = async () => {
    try {
      setLoading(true);
      const nanniesRef = ref(db);
      const snapshot = await get(
        lastKey
          ? query(
              nanniesRef,
              orderByKey(),
              startAfter(lastKey),
              limitToFirst(PAGE_SIZE + 1),
            )
          : query(nanniesRef, orderByKey(), limitToFirst(PAGE_SIZE + 1)),
      );
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([id, value]) => ({
          ...(value as NannieCardInterface),
          id,
        }));
        if (data.length > PAGE_SIZE) {
          setHasMore(true);
          data.pop();
        } else {
          setHasMore(false);
        }

        setNannies((prev) => [...prev, ...data]);
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.scrollTo({
              top:
                containerRef.current.scrollHeight -
                containerRef.current.clientHeight,
              behavior: 'smooth',
            });
          }
        }, 0);

        if (data.length > 0) {
          setLastKey(data[data.length - 1].id);
        }
      } else {
        setHasMore(false);
      }
    } catch (e: unknown) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  console.log(nannies);

  return (
    <div className='mt-[88px] overflow-y-auto h-[100vh]' ref={containerRef}>
      <Container>
        <ul className='flex flex-col gap-8 pb-16 pt-8'>
          {nannies.map((item: NannieCardInterface) => (
            <li
              key={item.id}
              className='bg-[#fbfbfb] p-6 rounded-3xl flex gap-6 relative'
            >
              <NannieCard item={item} />
            </li>
          ))}
        </ul>
        {!loading && hasMore && (
          <button
            onClick={fetchNextPage}
            disabled={loading}
            className=' w-[159px] h-12 rounded-[30px] bg-[#103931] font-medium leading-[125%] tracking-[-0.01em] 
            text-[#fbfbfb] mb-[100px] mx-auto'
          >
            Load more
          </button>
        )}
        {loading && <Loader/>}
      </Container>
    </div>
  );
}
