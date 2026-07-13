const nodes = [
  { index: '01', label: 'External data', detail: 'fixtures + events', x: 36, y: 82, width: 138 },
  { index: '02', label: 'Ingestion', detail: 'validate + score', x: 226, y: 48, width: 142 },
  {
    index: '03',
    label: 'Source of truth',
    detail: 'relational domains',
    x: 418,
    y: 48,
    width: 174,
  },
  { index: '04', label: 'Live cache', detail: 'Redis freshness', x: 418, y: 230, width: 174 },
  { index: '05', label: 'Product APIs', detail: 'REST + GraphQL', x: 226, y: 230, width: 142 },
  { index: '06', label: 'User surfaces', detail: 'web + WeChat + bot', x: 36, y: 230, width: 138 },
] as const;

export function SystemMap() {
  return (
    <figure className="system-map" aria-labelledby="system-map-caption">
      <div className="system-map-head">
        <div>
          <span>QL / SYSTEM DOSSIER 01</span>
          <strong>LetLetMe live-data loop</strong>
        </div>
        <span className="status-dot">operational</span>
      </div>

      <div className="system-map-canvas">
        <svg viewBox="0 0 630 398" role="img" aria-labelledby="system-map-title system-map-desc">
          <title id="system-map-title">LetLetMe live-data architecture</title>
          <desc id="system-map-desc">
            External live data flows through scheduled ingestion and normalization into relational
            storage and Redis, then through APIs to web, WeChat and bot experiences. Verification
            and recovery workflows protect consistency between the storage layers.
          </desc>

          <g className="map-grid" aria-hidden="true">
            <path d="M18 24H612M18 124H612M18 224H612M18 324H612" />
            <path d="M116 16V380M216 16V380M316 16V380M416 16V380M516 16V380" />
          </g>

          <path className="map-flow map-flow-1" d="M174 125H226" />
          <path className="map-flow map-flow-2" d="M368 91H418" />
          <path className="map-flow map-flow-3" d="M505 140V230" />
          <path className="map-flow map-flow-4" d="M418 273H368" />
          <path className="map-flow map-flow-5" d="M226 273H174" />
          <path className="map-flow map-flow-recovery" d="M297 140V188H505V230" />
          <path className="map-flow map-flow-recovery" d="M105 316V354H505V316" />

          {nodes.map(node => (
            <g
              key={node.index}
              className={`map-node map-node-${node.index}`}
              transform={`translate(${node.x} ${node.y})`}
            >
              <rect width={node.width} height="92" rx="12" />
              <text x="14" y="22" className="map-index">
                {node.index}
              </text>
              <text x="14" y="50" className="map-label">
                {node.label}
              </text>
              <text x="14" y="71" className="map-detail">
                {node.detail}
              </text>
              <circle cx={node.width - 16} cy="18" r="4" className="map-node-status" />
            </g>
          ))}

          <g className="map-recovery-note">
            <rect x="194" y="334" width="242" height="40" rx="20" />
            <text x="315" y="359" textAnchor="middle">
              verify → rebuild → rerun → recover
            </text>
          </g>
        </svg>

        <div className="system-map-legend" aria-hidden="true">
          <span>scheduled</span>
          <span>stateful</span>
          <span>recoverable</span>
        </div>
      </div>

      <div className="system-map-readout" aria-label="System characteristics">
        <div>
          <span>Runtime</span>
          <strong>scheduled + live</strong>
        </div>
        <div>
          <span>State</span>
          <strong>SQL + Redis</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>3 product surfaces</strong>
        </div>
      </div>

      <figcaption id="system-map-caption">
        A simplified maintained-product flow showing freshness, shared rules and deliberate
        recovery.
      </figcaption>
    </figure>
  );
}
