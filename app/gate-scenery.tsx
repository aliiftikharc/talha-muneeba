// Decorative, non-interactive backdrop for the tap-to-open screen:
// draped fairy lights, floral corner clusters and falling petals.

const strands = [
  { y0: 2, sag: 34, count: 17 },
  { y0: -4, sag: 62, count: 21 },
  { y0: 12, sag: 20, count: 13 },
];

const bulbColors = ["warm", "gold", "blush"];

// Deterministic pseudo-random value in [0, 1) so server and client markup match.
const seeded = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const petals = Array.from({ length: 16 }, (_, i) => ({
  left: seeded(i + 1) * 100,
  size: 9 + seeded(i + 21) * 9,
  duration: 9 + seeded(i + 41) * 8,
  delay: -seeded(i + 61) * 16,
  drift: (seeded(i + 81) - 0.5) * 160,
  tone: i % 3,
}));

function FairyLights() {
  return (
    <div className="fairy-lights">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {strands.map(({ y0, sag }, i) => (
          <path
            key={i}
            d={`M0 ${y0} Q50 ${y0 + sag * 2} 100 ${y0}`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {strands.flatMap(({ y0, sag, count }, s) =>
        Array.from({ length: count }, (_, i) => {
          const t = (i + 0.5) / count;
          return (
            <span
              key={`${s}-${i}`}
              className={`bulb bulb-${bulbColors[(i + s) % bulbColors.length]}`}
              style={{
                left: `${t * 100}%`,
                top: `${y0 + 4 * sag * t * (1 - t)}%`,
                animationDelay: `${-seeded(s * 40 + i) * 3}s`,
                animationDuration: `${2 + seeded(s * 40 + i + 7) * 2}s`,
              }}
            />
          );
        }),
      )}
    </div>
  );
}

function Flower({
  x,
  y,
  r,
  petal,
  inner,
  count = 6,
  turn = 0,
}: {
  x: number;
  y: number;
  r: number;
  petal: string;
  inner: string;
  count?: number;
  turn?: number;
}) {
  const ring = (radius: number, fill: string, offset: number) =>
    Array.from({ length: count }, (_, i) => (
      <ellipse
        key={`${radius}-${i}`}
        cx={0}
        cy={-radius * 0.62}
        rx={radius * 0.46}
        ry={radius * 0.62}
        fill={fill}
        transform={`rotate(${(360 / count) * i + offset})`}
      />
    ));

  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      {ring(r, petal, 0)}
      {ring(r * 0.62, inner, 180 / count)}
      <circle r={r * 0.2} fill="#dfc47f" />
      <circle r={r * 0.1} fill="#b88a37" />
    </g>
  );
}

function Leaf({ x, y, size, turn, fill = "#6f9474" }: { x: number; y: number; size: number; turn: number; fill?: string }) {
  return (
    <path
      d={`M0 0 Q${size * 0.5} ${-size * 0.32} ${size} 0 Q${size * 0.5} ${size * 0.32} 0 0 Z`}
      fill={fill}
      transform={`translate(${x} ${y}) rotate(${turn})`}
    />
  );
}

function FloralCluster({ className }: { className: string }) {
  return (
    <svg className={`floral ${className}`} viewBox="0 0 300 300" aria-hidden="true">
      <path d="M-10 310 C60 240 120 200 250 150" className="floral-stem" />
      <path d="M-10 290 C30 220 40 140 70 60" className="floral-stem" />
      <Leaf x={150} y={205} size={46} turn={-38} />
      <Leaf x={190} y={180} size={40} turn={-12} fill="#87a985" />
      <Leaf x={225} y={160} size={34} turn={-40} />
      <Leaf x={40} y={150} size={40} turn={-100} fill="#87a985" />
      <Leaf x={55} y={95} size={34} turn={-70} />
      <Leaf x={95} y={262} size={52} turn={-10} fill="#5f8a6a" />
      <Leaf x={10} y={210} size={48} turn={-80} fill="#5f8a6a" />
      <Flower x={62} y={246} r={44} petal="#f2c4c1" inner="#e7a5a6" />
      <Flower x={150} y={272} r={30} petal="#f7ecd8" inner="#ecdcbd" turn={20} />
      <Flower x={34} y={166} r={27} petal="#f7ecd8" inner="#ecdcbd" count={5} />
      <Flower x={128} y={200} r={22} petal="#efc28f" inner="#e4a86c" count={5} turn={15} />
      <Flower x={205} y={236} r={14} petal="#f2c4c1" inner="#e7a5a6" count={5} />
      <Flower x={72} y={104} r={12} petal="#f2c4c1" inner="#e7a5a6" count={5} />
      <Flower x={250} y={150} r={10} petal="#f7ecd8" inner="#ecdcbd" count={5} />
      {[
        [100, 150],
        [175, 215],
        [230, 195],
        [95, 60],
        [20, 110],
        [260, 120],
        [190, 150],
        [60, 30],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.2} fill="#dfc47f" />
      ))}
    </svg>
  );
}

export default function GateScenery() {
  return (
    <div className="gate-scenery" aria-hidden="true">
      <div className="gate-glow" />
      <FairyLights />
      <FloralCluster className="floral-left" />
      <FloralCluster className="floral-right" />
      <div className="petals">
        {petals.map((p, i) => (
          <span
            key={i}
            className={`petal petal-${p.tone}`}
            style={
              {
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                "--drift": `${p.drift}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
