'use client';

import React, { useEffect, useRef, useState } from 'react';

type Position = {
  x: number;
  y: number;
};

type Layout = 'horizontal' | 'vertical';

type ImageIndex = 0 | 1;

type ImageProps = {
  src: string;
  alt: string;
};

type DraggableImageProps = {
  index: ImageIndex;
  position: Position;
  opacity: number;
  onDragStart: (e: React.MouseEvent, index: ImageIndex) => void;
  src: string;
  alt: string;
  hasBeenMoved: boolean;
  zIndex: number;
  width: number;
  height: number;
  alignment?: 'top' | 'center' | 'bottom';
};

type DraggableImagesProps = {
  images: ImageProps[];
  containerClassName?: string;
  opacity?: number;
  layout?: Layout;
  spacing?: number;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: 'top' | 'center' | 'bottom';
};

type MovedState = {
  0: boolean;
  1: boolean;
};

type PositionState = {
  0: Position;
  1: Position;
};

const DraggableImage: React.FC<DraggableImageProps> = ({
  index,
  position,
  opacity,
  onDragStart,
  src,
  alt,
  hasBeenMoved,
  zIndex,
  width,
  height,
  alignment = 'center',
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className='ui-cursor-move ui-transition-all ui-duration-200'
      style={{
        position: 'absolute', // Ensure this is explicitly set
        transform: `translate(${position.x}px, ${position.y}px)`,
        userSelect: 'none',
        zIndex,
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
      }}
      onMouseDown={(e) => onDragStart(e, index)}
    >
      {imageError ? (
        <div className='ui-w-full ui-h-full ui-bg-gray-200 ui-flex ui-items-center ui-justify-center ui-text-gray-500 ui-rounded-lg'>
          Image failed to load
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            opacity: hasBeenMoved ? opacity / 100 : 1,
            top: alignment === 'top' ? 0 : alignment === 'center' ? '50%' : 'unset',
            bottom: alignment === 'bottom' ? 0 : alignment === 'center' ? '50%' : 'unset',
            transform: alignment === 'center' ? 'translateY(-50%)' : 'none',
          }}
          className='ui-rounded-lg ui-shadow-lg ui-w-full ui-h-full ui-object-cover ui-transition-opacity ui-duration-200'
          draggable='false'
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
};

const DraggableImages: React.FC<DraggableImagesProps> = ({
  images,
  containerClassName = '',
  opacity = 50,
  layout = 'horizontal',
  spacing = 20,
  imageWidth = 200,
  imageHeight = 200,
  imagePosition = 'center',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getInitialPositions = (): PositionState => {
    const firstPosition = { x: 0, y: 0 };
    const secondPosition =
      layout === 'horizontal' ? { x: imageWidth + spacing, y: 0 } : { x: 0, y: imageHeight + spacing };

    return {
      0: firstPosition,
      1: secondPosition,
    };
  };

  useEffect(() => {
    const positions = getInitialPositions();
    setPositions(positions);
  }, [layout, imageWidth, imageHeight, spacing]);

  const [positions, setPositions] = useState<PositionState>(getInitialPositions);
  const [movedImages, setMovedImages] = useState<MovedState>({ 0: false, 1: false });
  const [dragging, setDragging] = useState<ImageIndex | null>(null);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<ImageIndex | null>(null);

  useEffect(() => {
    setPositions(getInitialPositions());
  }, [layout, imageWidth, imageHeight, spacing]);

  const handleDragStart = (e: React.MouseEvent, index: ImageIndex) => {
    if (!containerRef.current) return;

    setDragging(index);
    setSelectedImage(index);

    const currentPos = positions[index];
    setDragStart({
      x: e.clientX - currentPos.x,
      y: e.clientY - currentPos.y,
    });
  };

  const handleDrag = (e: React.MouseEvent) => {
    if (dragging === null) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setMovedImages((prev) => ({
      ...prev,
      [dragging]: true,
    }));

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
        let newPos = { ...currentPos };

        switch (e.key) {
          case 'ArrowLeft':
            newPos.x -= MOVE_DISTANCE;
            break;
          case 'ArrowRight':
            newPos.x += MOVE_DISTANCE;
            break;
          case 'ArrowUp':
            newPos.y -= MOVE_DISTANCE;
            break;
          case 'ArrowDown':
            newPos.y += MOVE_DISTANCE;
            break;
          default:
            return prev;
        }

        setMovedImages((prev) => ({
          ...prev,
          [selectedImage]: true,
        }));

        return {
          ...prev,
          [selectedImage]: newPos,
        };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div
      ref={containerRef}
      className={`ui-relative ui-bg-gray-100 ui-rounded-lg ui-p-[20px] ${containerClassName}`}
      style={{
        width: layout === 'horizontal' ? imageWidth * 2 + spacing : imageWidth,
        height: layout === 'horizontal' ? imageHeight : imageHeight * 2 + spacing,
      }}
      onMouseMove={handleDrag}
      onMouseUp={() => setDragging(null)}
      onMouseLeave={() => setDragging(null)}
    >
      {(images as [ImageProps, ImageProps]).map((imageProps, i) => {
        const index = i as ImageIndex;
        const position = positions[index];

        return (
          <DraggableImage
            key={index}
            index={index}
            position={position}
            opacity={opacity}
            onDragStart={handleDragStart}
            src={imageProps.src}
            alt={imageProps.alt}
            hasBeenMoved={movedImages[index]}
            zIndex={selectedImage === index ? 2 : 1}
            width={imageWidth}
            height={imageHeight}
            alignment={imagePosition}
          />
        );
      })}
    </div>
  );
};

export default DraggableImages;
