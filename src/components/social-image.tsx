type SocialImageProps = {
  eyebrow: string;
  title: string;
  description?: string;
  detail: string;
};

export function SocialImage({ eyebrow, title, description, detail }: SocialImageProps) {
  const compact = title.length > 52;

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        flexDirection: 'column',
        padding: '62px 72px',
        background: 'linear-gradient(135deg, #0e151c 0%, #111d27 58%, #17253a 100%)',
        color: '#edf2f5',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 62,
          right: 72,
          left: 72,
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#aeb9c2',
          fontSize: 22,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        <span>QL / Full-stack software engineer</span>
        <span>Perth, WA</span>
      </div>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: compact ? 174 : 182,
          right: 72,
          left: 72,
          maxWidth: 1040,
          flexDirection: 'column',
          flexShrink: 0,
          gap: compact ? 16 : 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            color: '#8faeff',
            fontSize: 20,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ width: 42, height: 2, background: '#8faeff' }} />
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: compact ? 54 : 66,
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
          }}
        >
          {title}
        </div>
        {description ? (
          <div
            style={{
              display: 'flex',
              maxWidth: 940,
              color: '#b9c4cc',
              fontSize: compact ? 22 : 25,
              lineHeight: 1.35,
            }}
          >
            {description}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: 'flex',
          position: 'absolute',
          right: 72,
          bottom: 62,
          left: 72,
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#aeb9c2',
          fontSize: compact ? 18 : 20,
          flexShrink: 0,
        }}
      >
        <span>qitonglan.com</span>
        <span>{detail}</span>
      </div>
    </div>
  );
}
