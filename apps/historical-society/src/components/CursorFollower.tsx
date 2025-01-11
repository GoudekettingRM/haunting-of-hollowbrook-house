'use client';
import { useEffect, useState } from 'react';
import CursorFollowingText from './CursorFollowingText';
import { FollowingItem, useBuggingContext } from './useBuggingContext';

const ITEMS: FollowingItem[] = ['title', 'edgar', 'margaret', 'copyright', 'hollowbrook', 'stuck', 'help', 'read more'];

const getNextItem = (currentItem: FollowingItem | null) => {
  let nextItem;
  do {
    nextItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
  } while (nextItem === currentItem);
  return nextItem;
};

const CursorFollower = () => {
  const { isBugged, followingItem, setFollowingItem } = useBuggingContext();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!isBugged) return;

    const scheduleNextChange = () => {
      setTimeout(
        () => {
          const nextItem = getNextItem(followingItem);
          setFollowingItem(nextItem);
          setKey((prev) => prev + 1);
          scheduleNextChange();
        },
        Math.random() * 10000 + 1000,
      );
    };

    scheduleNextChange();
  }, [isBugged]);

  if (!isBugged) return null;

  switch (followingItem) {
    case 'title':
      return <CursorFollowingText key={key} textClass='text-2xl text-gray-800' text='WHHS' />;
    case 'edgar':
      return <CursorFollowingText key={key} textClass='text-base text-gray-800' text='Edgar' />;
    case 'margaret':
      return <CursorFollowingText key={key} textClass='text-base text-gray-800' text='Margaret' />;
    case 'copyright':
      return <CursorFollowingText key={key} textClass='text-sm text-gray-800' text='© 1939' />;
    case 'hollowbrook':
      return <CursorFollowingText key={key} textClass='text-base text-gray-800' text='Hollowbrook House' />;
    case 'stuck':
      return <CursorFollowingText key={key} textClass='text-lg text-gray-800' text='Stuck?' />;
    case 'help':
      return <CursorFollowingText key={key} textClass='text-lg text-gray-800' text='Help' />;
    case 'read more':
      return <CursorFollowingText key={key} textClass='text-base underline text-gray-800' text='Read more ›' />;
  }
};

export default CursorFollower;
