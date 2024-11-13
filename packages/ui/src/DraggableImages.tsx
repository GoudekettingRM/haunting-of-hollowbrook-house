'use client';
// Types
export type Position = {
  x: number;
  y: number;
};

export type ImageProps = {
  src: string;
  alt: string;
  startPosition?: Position;
  [key: string]: any; // Allow any other valid img props
};

export type DraggableImageProps = {
  index: number;
  position: Position;
  isTop: boolean;
  opacity: number;
  onDragStart: (e: React.MouseEvent, index: number) => void;
} & Omit<ImageProps, 'startPosition'>;

type DraggableImagesProps = {
  images: ImageProps[];
  containerClassName?: string;
  opacity?: number;
  changeZIndexOnSelect?: boolean;
};

import { useEffect, useState } from 'react';

export const DraggableImage: React.FC<DraggableImageProps> = ({
  index,
  position,
  isTop,
  opacity,
  onDragStart,
  ...imageProps
}) => {
  return (
    <div
      className='absolute cursor-move'
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        userSelect: 'none',
        zIndex: isTop ? 10 : 1,
      }}
      onMouseDown={(e) => onDragStart(e, index)}
    >
      <img {...imageProps} style={{ opacity: opacity / 100 }} className={`rounded-lg shadow-lg`} draggable='false' />
    </div>
  );
};

const DraggableImages: React.FC<DraggableImagesProps> = ({
  images = [
    { src: '/api/placeholder/200/200', alt: 'Draggable 1' },
    { src: '/api/placeholder/200/200', alt: 'Draggable 2' },
  ],
  containerClassName = '',
  opacity = 50,
  changeZIndexOnSelect = true,
}) => {
  if (!images.every((img) => img.src && img.alt)) {
    throw new Error('All images must have src and alt properties');
  }

  const [positions, setPositions] = useState<Record<number, Position>>(() =>
    images.reduce(
      (acc, image, index) => {
        // Use provided startPosition or default to spaced horizontally
        acc[index] = image.startPosition || { x: index * 300, y: 0 };
        return acc;
      },
      {} as Record<number, Position>,
    ),
  );

  const [topImage, setTopImage] = useState<number>(0);
  const [dragging, setDragging] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleDragStart = (e: React.MouseEvent, index: number) => {
    setDragging(index);
    if (changeZIndexOnSelect) {
      setTopImage(index);
    }
    setSelectedImage(index);
    setDragStart({
      x: e.clientX - positions[index].x,
      y: e.clientY - positions[index].y,
    });
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (dragging === null) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setPositions((prev) => ({
      ...prev,
      [dragging]: { x: newX, y: newY },
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      const MOVE_DISTANCE = e.shiftKey ? 10 : 1;

      setPositions((prev) => {
        const currentPos = prev[selectedImage];
        switch (e.key) {
          case 'ArrowLeft':
            return { ...prev, [selectedImage]: { ...currentPos, x: currentPos.x - MOVE_DISTANCE } };
          case 'ArrowRight':
            return { ...prev, [selectedImage]: { ...currentPos, x: currentPos.x + MOVE_DISTANCE } };
          case 'ArrowUp':
            return { ...prev, [selectedImage]: { ...currentPos, y: currentPos.y - MOVE_DISTANCE } };
          case 'ArrowDown':
            return { ...prev, [selectedImage]: { ...currentPos, y: currentPos.y + MOVE_DISTANCE } };
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div
      className={`relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden ${containerClassName}`}
      onMouseMove={handleDrag}
      onMouseUp={() => setDragging(null)}
      onMouseLeave={() => setDragging(null)}
    >
      {images.map((imageProps, index) => {
        const { startPosition, ...restImageProps } = imageProps;
        return (
          <DraggableImage
            key={index}
            index={index}
            position={positions[index]}
            isTop={topImage === index}
            opacity={opacity}
            onDragStart={handleDragStart}
            {...restImageProps}
          />
        );
      })}
    </div>
  );
};

export default DraggableImages;
