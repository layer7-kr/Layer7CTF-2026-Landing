import {
  motion,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

import s from "./style.module.scss";

const METEOR_INTERVAL = 4000;
const DEPTHS = [0.35, 0.65, 1];
const STAR_BAND_HEIGHT = 800;
const SPRING = { stiffness: 35, damping: 18, mass: 1.2 };
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type StarStyle = CSSProperties & {
  "--star-size": string;
  "--star-opacity": number;
  "--twinkle-duration": string;
  "--twinkle-delay": string;
  "--drift-duration": string;
  "--drift-delay": string;
  "--drift-x": string;
  "--drift-y": string;
};

type MeteorStyle = CSSProperties & {
  "--meteor-angle": string;
  "--meteor-length": string;
  "--meteor-distance": string;
  "--meteor-duration": string;
};

function createStars(bands = 1): StarStyle[][] {
  return DEPTHS.map((depth, layer) => {
    const count = (16 - layer * 3) * bands;
    return Array.from({ length: count }, (_, index) => ({
      left: `${Math.random() * 100}%`,
      // Spread stars evenly from the beginning to the end of the page.
      top: `${((index + Math.random()) / count) * 100}%`,
      "--star-size": `${0.7 + depth * 0.6 + Math.random() * 0.7}px`,
      "--star-opacity": 0.16 + depth * 0.12 + Math.random() * 0.15,
      "--twinkle-duration": `${22 + Math.random() * 24}s`,
      "--twinkle-delay": `${-Math.random() * 46}s`,
      "--drift-duration": `${28 + Math.random() * 24}s`,
      "--drift-delay": `${-Math.random() * 52}s`,
      "--drift-x": `${(Math.random() - 0.5) * 10}px`,
      "--drift-y": `${(Math.random() - 0.5) * 8}px`,
    }));
  });
}

function StarLayer({
  stars,
  depth,
  x,
  y,
  reducedMotion,
}: {
  stars: StarStyle[];
  depth: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const offsetX = useTransform(x, (value) => value * depth);
  const offsetY = useTransform(y, (value) => value * depth);

  return (
    <motion.div
      className={s.star_layer}
      style={{ x: reducedMotion ? 0 : offsetX, y: reducedMotion ? 0 : offsetY }}
    >
      {stars.map((style, index) => (
        <span className={s.star} style={style} key={index}>
          <span className={s.star_light} />
        </span>
      ))}
    </motion.div>
  );
}

export default function SpaceBackground({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const meteorLayerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState(() => createStars());
  const [meteor, setMeteor] = useState<{
    id: number;
    style: MeteorStyle;
  } | null>(null);
  const [visible, setVisible] = useState(!document.hidden);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let previousBands = 1;
    const updateStars = () => {
      const bands = Math.max(1, Math.ceil(scene.clientHeight / STAR_BAND_HEIGHT));
      if (bands === previousBands) return;
      previousBands = bands;
      setStars(createStars(bands));
    };

    updateStars();
    const observer = new ResizeObserver(updateStars);
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    const onMotionPreferenceChange = () => setReducedMotion(preference.matches);
    const onVisibilityChange = () => setVisible(!document.hidden);
    preference.addEventListener("change", onMotionPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      preference.removeEventListener("change", onMotionPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    if (reducedMotion || !visible) {
      resetPointer();
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 28);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 20);
    };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) resetPointer();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", resetPointer);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", resetPointer);
    };
  }, [pointerX, pointerY, reducedMotion, visible]);

  useEffect(() => {
    if (reducedMotion || !visible) {
      setMeteor(null);
      return;
    }

    const interval = window.setInterval(() => {
      const layer = meteorLayerRef.current;
      if (!layer || !layer.clientWidth || !layer.clientHeight) return;

      const width = layer.clientWidth;
      const height = layer.clientHeight;
      const margin = Math.min(12, width / 4, height / 4);
      const angle = 20 + Math.random() * 20;
      const radians = (angle * Math.PI) / 180;
      const length = Math.min(130, width * 0.18);
      const distance = Math.min(340, width * 0.35) * (0.7 + Math.random() * 0.3);
      // Reserve room for both the trail and its entire flight, even in short viewports.
      const scale = Math.min(
        1,
        (width - margin * 2) / ((length + distance) * Math.cos(radians)),
        (height - margin * 2) / ((length + distance) * Math.sin(radians)),
      );
      const travelWidth = (length + distance) * scale * Math.cos(radians);
      const travelHeight = (length + distance) * scale * Math.sin(radians);
      setMeteor({
        id: performance.now(),
        style: {
          left: `${margin + Math.random() * Math.max(0, width - margin * 2 - travelWidth)}px`,
          top: `${margin + Math.random() * Math.max(0, height - margin * 2 - travelHeight)}px`,
          "--meteor-angle": `${angle}deg`,
          "--meteor-length": `${length * scale}px`,
          "--meteor-distance": `${distance * scale}px`,
          "--meteor-duration": `${1100 + Math.random() * 500}ms`,
        },
      });
    }, METEOR_INTERVAL);

    const clearMeteor = () => setMeteor(null);
    const observer = new ResizeObserver(clearMeteor);
    if (meteorLayerRef.current) observer.observe(meteorLayerRef.current);

    return () => {
      window.clearInterval(interval);
      observer.disconnect();
    };
  }, [reducedMotion, visible]);

  return (
    <div className={s.scene} ref={sceneRef}>
      <div
        className={s.background}
        aria-hidden="true"
        data-paused={!visible || reducedMotion}
      >
        {stars.map((layer, index) => (
          <StarLayer
            stars={layer}
            depth={DEPTHS[index]}
            x={x}
            y={y}
            reducedMotion={reducedMotion}
            key={index}
          />
        ))}
      </div>
      <div className={s.meteor_layer} ref={meteorLayerRef} aria-hidden="true">
        {meteor && (
          <div className={s.meteor_origin} style={meteor.style} key={meteor.id}>
            <span className={s.meteor} onAnimationEnd={() => setMeteor(null)} />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
