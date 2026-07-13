export function SystemMap() {
  return (
    <figure className="system-map" aria-labelledby="system-map-caption">
      <div className="system-map-head">
        <span>LIVE SYSTEM / 01</span>
        <span className="status-dot">operational</span>
      </div>
      <svg viewBox="0 0 680 430" role="img" aria-labelledby="system-map-title system-map-desc">
        <title id="system-map-title">LetLetMe live data architecture</title>
        <desc id="system-map-desc">
          External live data flows through scheduled ingestion and normalization into relational
          storage and Redis, then through APIs to web, companion and bot experiences.
        </desc>
        <path
          className="map-line"
          d="M118 112H238M332 112H454M520 148v72M454 266H332M238 266H118"
        />
        <path className="map-line map-line-dashed" d="M285 148v72M118 302v48h402v-48" />
        <g className="map-node">
          <rect x="28" y="72" width="90" height="76" rx="10" />
          <text x="73" y="102" textAnchor="middle">
            EXTERNAL
          </text>
          <text x="73" y="124" textAnchor="middle" className="map-detail">
            live data
          </text>
        </g>
        <g className="map-node map-node-accent">
          <rect x="238" y="72" width="94" height="76" rx="10" />
          <text x="285" y="102" textAnchor="middle">
            INGEST
          </text>
          <text x="285" y="124" textAnchor="middle" className="map-detail">
            schedule + score
          </text>
        </g>
        <g className="map-node">
          <rect x="454" y="72" width="132" height="76" rx="10" />
          <text x="520" y="102" textAnchor="middle">
            SOURCE OF TRUTH
          </text>
          <text x="520" y="124" textAnchor="middle" className="map-detail">
            PostgreSQL / MySQL
          </text>
        </g>
        <g className="map-node map-node-accent">
          <rect x="454" y="220" width="132" height="82" rx="10" />
          <text x="520" y="253" textAnchor="middle">
            LIVE CACHE
          </text>
          <text x="520" y="276" textAnchor="middle" className="map-detail">
            Redis
          </text>
        </g>
        <g className="map-node">
          <rect x="238" y="220" width="94" height="82" rx="10" />
          <text x="285" y="253" textAnchor="middle">
            APIs
          </text>
          <text x="285" y="276" textAnchor="middle" className="map-detail">
            REST + GraphQL
          </text>
        </g>
        <g className="map-node">
          <rect x="28" y="220" width="90" height="82" rx="10" />
          <text x="73" y="253" textAnchor="middle">
            PRODUCT
          </text>
          <text x="73" y="276" textAnchor="middle" className="map-detail">
            web + clients
          </text>
        </g>
        <g className="map-note">
          <rect x="118" y="350" width="402" height="46" rx="23" />
          <text x="319" y="378" textAnchor="middle">
            verify → rebuild → rerun → recover
          </text>
        </g>
      </svg>
      <figcaption id="system-map-caption">
        A real product flow, simplified for the portfolio.
      </figcaption>
    </figure>
  );
}
