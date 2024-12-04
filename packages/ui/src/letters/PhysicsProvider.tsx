import { Bodies, Body, Engine, World } from 'matter-js';
import React, { createContext, useContext, useEffect, useRef } from 'react';

interface PhysicsContextType {
  engine: Matter.Engine | null;
  addBody: (body: Matter.Body) => void;
  removeBody: (body: Matter.Body) => void;
}

const PhysicsContext = createContext<PhysicsContextType>({
  engine: null,
  addBody: () => {},
  removeBody: () => {},
});

export const usePhysics = () => useContext(PhysicsContext);

export const PhysicsProvider = ({ children }: { children: React.ReactNode }) => {
  const engineRef = useRef<Matter.Engine | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);
  const scrollStartRef = useRef(window.scrollY);

  useEffect(() => {
    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 0.5 },
    });
    engineRef.current = engine;

    // Create viewport boundaries
    const wallThickness = 50;
    const walls = [
      // Bottom wall (viewport bottom)
      Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + scrollStartRef.current,
        window.innerWidth,
        wallThickness,
        { isStatic: true, friction: 0.1, restitution: 0.5 },
      ),
      // Left wall
      Bodies.rectangle(0, window.innerHeight / 2 + scrollStartRef.current, wallThickness, window.innerHeight, {
        isStatic: true,
        friction: 0.1,
        restitution: 0.5,
      }),
      // Right wall
      Bodies.rectangle(
        window.innerWidth,
        window.innerHeight / 2 + scrollStartRef.current,
        wallThickness,
        window.innerHeight,
        { isStatic: true, friction: 0.1, restitution: 0.5 },
      ),
      // Top wall (viewport top)
      Bodies.rectangle(window.innerWidth / 2, scrollStartRef.current, window.innerWidth, wallThickness, {
        isStatic: true,
        friction: 0.1,
        restitution: 0.5,
      }),
    ];

    wallsRef.current = walls;
    World.add(engine.world, walls);

    // Run physics engine
    const runner = () => {
      Engine.update(engine, 1000 / 60);
      requestAnimationFrame(runner);
    };
    requestAnimationFrame(runner);

    // Handle scroll
    const handleScroll = () => {
      const deltaY = window.scrollY - scrollStartRef.current;

      // Move walls to stay with viewport
      walls.forEach((wall, index) => {
        const baseY =
          index === 0
            ? window.innerHeight // Bottom wall
            : index === 3
              ? 0 // Top wall
              : window.innerHeight / 2; // Side walls

        Body.setPosition(wall, {
          x: wall.position.x,
          y: baseY + window.scrollY,
        });
      });

      // Move non-wall bodies
      engine.world.bodies.forEach((body) => {
        if (!walls.includes(body)) {
          Body.translate(body, { x: 0, y: deltaY });
        }
      });

      scrollStartRef.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      Engine.clear(engine);
      World.clear(engine.world, false);
    };
  }, []);

  return (
    <PhysicsContext.Provider
      value={{
        engine: engineRef.current,
        addBody: (body: Matter.Body) => {
          if (engineRef.current) {
            World.add(engineRef.current.world, [body]);
          }
        },
        removeBody: (body: Matter.Body) => {
          if (engineRef.current) {
            World.remove(engineRef.current.world, body);
          }
        },
      }}
    >
      {children}
    </PhysicsContext.Provider>
  );
};
