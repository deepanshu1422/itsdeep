// Meaningful programmatic SVGs — each represents the topic, not random patterns
// Warm Skool palette only

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function s(seed: number, i: number): number {
  return Math.sin(seed * 9301 + i * 49297 + 0.1) * 0.5 + 0.5;
}

// Warm backgrounds only
const bgs = ['#FDF1D5', '#FCF7E3', '#FAE3AC', '#F8F7F5', '#F8D481'];
const fg = '#202124';
const accent = '#E8B94A';
const gold = '#F8D481';
const line = '#E4E4E4';

// Determine graphic type from slug keywords
function getGraphicType(slug: string): string {
  if (slug.includes('email') || slug.includes('newsletter') || slug.includes('subject-line') || slug.includes('list-building') || slug.includes('cold-email')) return 'email';
  if (slug.includes('seo') || slug.includes('keyword') || slug.includes('link-building') || slug.includes('search-console') || slug.includes('technical-seo')) return 'search';
  if (slug.includes('social') || slug.includes('linkedin') || slug.includes('youtube') || slug.includes('tiktok') || slug.includes('instagram')) return 'social';
  if (slug.includes('automation') || slug.includes('workflow') || slug.includes('zapier') || slug.includes('n8n') || slug.includes('rpa') || slug.includes('robotic')) return 'automation';
  if (slug.includes('content') || slug.includes('writing') || slug.includes('copywriting') || slug.includes('brand-voice') || slug.includes('podcast') || slug.includes('video')) return 'content';
  if (slug.includes('ads') || slug.includes('ppc') || slug.includes('retargeting') || slug.includes('google-ads')) return 'ads';
  if (slug.includes('analytics') || slug.includes('roi') || slug.includes('budget') || slug.includes('cac') || slug.includes('testing')) return 'analytics';
  if (slug.includes('chatbot') || slug.includes('agent') || slug.includes('assistant') || slug.includes('customer-service')) return 'chatbot';
  if (slug.includes('funnel') || slug.includes('lead') || slug.includes('conversion') || slug.includes('retention') || slug.includes('sales')) return 'funnel';
  if (slug.includes('learn') || slug.includes('course') || slug.includes('how-to-learn')) return 'learn';
  if (slug.includes('strategy') || slug.includes('growth') || slug.includes('market-research') || slug.includes('competitor')) return 'strategy';
  if (slug.includes('ecommerce') || slug.includes('product-launch') || slug.includes('saas') || slug.includes('clinic') || slug.includes('real-estate')) return 'business';
  if (slug.includes('community') || slug.includes('skool') || slug.includes('webinar')) return 'community';
  if (slug.includes('tool') || slug.includes('tech-stack') || slug.includes('prompt')) return 'tools';
  return 'default';
}

interface Props {
  slug: string;
  title: string;
  className?: string;
}

export default function BlogGraphic({ slug, title, className }: Props) {
  const seed = hash(slug);
  const bg = bgs[seed % bgs.length];
  const type = getGraphicType(slug);

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} style={{ background: bg }}>
      <svg viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
        <GraphicByType type={type} seed={seed} />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
        style={{ background: `linear-gradient(transparent, ${bg}ee, ${bg})` }}>
        <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: fg, opacity: 0.3 }}>itsdeep.io</p>
      </div>
    </div>
  );
}

export function BlogGraphicSmall({ slug, className }: { slug: string; className?: string }) {
  const seed = hash(slug);
  const bg = bgs[seed % bgs.length];
  const type = getGraphicType(slug);

  return (
    <svg viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <rect width="800" height="300" fill={bg} />
      <GraphicByType type={type} seed={seed} />
    </svg>
  );
}

function GraphicByType({ type, seed }: { type: string; seed: number }) {
  switch (type) {
    case 'email': return <EmailGraphic seed={seed} />;
    case 'search': return <SearchGraphic seed={seed} />;
    case 'social': return <SocialGraphic seed={seed} />;
    case 'automation': return <AutomationGraphic seed={seed} />;
    case 'content': return <ContentGraphic seed={seed} />;
    case 'ads': return <AdsGraphic seed={seed} />;
    case 'analytics': return <AnalyticsGraphic seed={seed} />;
    case 'chatbot': return <ChatbotGraphic seed={seed} />;
    case 'funnel': return <FunnelGraphic seed={seed} />;
    case 'learn': return <LearnGraphic seed={seed} />;
    case 'strategy': return <StrategyGraphic seed={seed} />;
    case 'business': return <BusinessGraphic seed={seed} />;
    case 'community': return <CommunityGraphic seed={seed} />;
    case 'tools': return <ToolsGraphic seed={seed} />;
    default: return <DefaultGraphic seed={seed} />;
  }
}

// Email: envelope shape + lines
function EmailGraphic({ seed }: { seed: number }) {
  const ox = s(seed, 0) * 100 + 200;
  return (
    <>
      <rect x={ox} y={80} width={320} height={200} rx={16} fill="white" opacity="0.6" />
      <path d={`M${ox} 96 L${ox+160} 180 L${ox+320} 96`} stroke={accent} strokeWidth="3" fill="none" opacity="0.7" />
      {[1,2,3].map(i => (
        <rect key={i} x={ox+40} y={140+i*28} width={160+s(seed,i)*80} height={8} rx={4} fill={fg} opacity="0.06" />
      ))}
      <rect x={ox+40} y={240} width={80} height={24} rx={6} fill={gold} opacity="0.6" />
    </>
  );
}

// Search: magnifying glass + results
function SearchGraphic({ seed }: { seed: number }) {
  const cx = 300 + s(seed, 0) * 100;
  return (
    <>
      <circle cx={cx} cy={120} r={70} stroke={accent} strokeWidth="6" fill="white" opacity="0.5" />
      <line x1={cx+50} y1={170} x2={cx+90} y2={210} stroke={accent} strokeWidth="8" strokeLinecap="round" opacity="0.5" />
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={cx+130} y={70+i*45} width={220} height={32} rx={8} fill="white" opacity="0.5" />
          <rect x={cx+142} y={80+i*45} width={100+s(seed,i)*80} height={12} rx={4} fill={fg} opacity="0.08" />
        </g>
      ))}
      <circle cx={cx} cy={120} r={4} fill={accent} opacity="0.6" />
    </>
  );
}

// Social: speech bubbles + connections
function SocialGraphic({ seed }: { seed: number }) {
  return (
    <>
      <rect x={200} y={60} width={180} height={100} rx={16} fill="white" opacity="0.5" />
      <polygon points="240,160 260,160 230,185" fill="white" opacity="0.5" />
      <rect x={420} y={120} width={200} height={90} rx={16} fill={gold} opacity="0.3" />
      <polygon points="580,210 560,210 590,235" fill={gold} opacity="0.3" />
      {[1,2].map(i => <rect key={i} x={220} y={75+i*25} width={120+s(seed,i)*40} height={8} rx={4} fill={fg} opacity="0.06" />)}
      {[1,2].map(i => <rect key={i} x={440} y={135+i*22} width={100+s(seed,i+3)*60} height={8} rx={4} fill={fg} opacity="0.06" />)}
      <circle cx={170} cy={100} r={25} fill={accent} opacity="0.4" />
      <circle cx={660} cy={160} r={22} fill={accent} opacity="0.3" />
    </>
  );
}

// Automation: connected blocks / flow
function AutomationGraphic({ seed }: { seed: number }) {
  const blocks = [
    { x: 100, y: 110 }, { x: 280, y: 80 }, { x: 460, y: 110 }, { x: 640, y: 80 },
  ];
  return (
    <>
      {blocks.map((b, i) => (
        <g key={i}>
          {i < blocks.length - 1 && (
            <line x1={b.x+60} y1={b.y+35} x2={blocks[i+1].x} y2={blocks[i+1].y+35}
              stroke={accent} strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
          )}
          <rect x={b.x} y={b.y} width={120} height={70} rx={12} fill="white" opacity="0.6" />
          <rect x={b.x+20} y={b.y+18} width={80} height={8} rx={4} fill={fg} opacity="0.08" />
          <rect x={b.x+20} y={b.y+34} width={50+s(seed,i)*30} height={8} rx={4} fill={accent} opacity="0.4" />
          {i < blocks.length - 1 && (
            <circle cx={b.x+120+((blocks[i+1].x-b.x-120)/2)} cy={b.y+35+((blocks[i+1].y-b.y)/2)} r={10} fill={gold} opacity="0.5" />
          )}
        </g>
      ))}
    </>
  );
}

// Content: document pages
function ContentGraphic({ seed }: { seed: number }) {
  return (
    <>
      {[0,1,2].map(i => {
        const x = 180 + i * 160;
        const y = 50 + (i === 1 ? 20 : 0);
        const tilt = (i - 1) * 5;
        return (
          <g key={i} transform={`rotate(${tilt} ${x+70} ${y+100})`}>
            <rect x={x} y={y} width={140} height={200} rx={10} fill="white" opacity={i === 1 ? 0.7 : 0.4} />
            <rect x={x+16} y={y+20} width={108} height={10} rx={4} fill={fg} opacity="0.1" />
            <rect x={x+16} y={y+40} width={80+s(seed,i)*28} height={8} rx={4} fill={fg} opacity="0.06" />
            <rect x={x+16} y={y+56} width={90+s(seed,i+3)*18} height={8} rx={4} fill={fg} opacity="0.06" />
            <rect x={x+16} y={y+80} width={108} height={50} rx={6} fill={gold} opacity={i === 1 ? 0.3 : 0.15} />
            <rect x={x+16} y={y+145} width={60} height={20} rx={5} fill={accent} opacity={i === 1 ? 0.5 : 0.25} />
          </g>
        );
      })}
    </>
  );
}

// Ads: target / bullseye + click
function AdsGraphic({ seed }: { seed: number }) {
  const cx = 350 + s(seed, 0) * 100;
  return (
    <>
      <circle cx={cx} cy={150} r={110} stroke={line} strokeWidth="2" fill="none" opacity="0.3" />
      <circle cx={cx} cy={150} r={75} stroke={accent} strokeWidth="3" fill="none" opacity="0.4" />
      <circle cx={cx} cy={150} r={40} stroke={accent} strokeWidth="3" fill={gold} opacity="0.3" />
      <circle cx={cx} cy={150} r={10} fill={accent} opacity="0.7" />
      {/* Cursor arrow */}
      <g transform={`translate(${cx+30}, ${150-30})`}>
        <path d="M0 0 L0 30 L8 22 L16 36 L22 33 L14 19 L24 19 Z" fill={fg} opacity="0.25" />
      </g>
      {/* Metric bars on right */}
      {[0,1,2,3].map(i => (
        <rect key={i} x={cx+140} y={80+i*35} width={60+s(seed,i)*80} height={20} rx={5}
          fill={i === 2 ? gold : fg} opacity={i === 2 ? 0.4 : 0.05} />
      ))}
    </>
  );
}

// Analytics: chart with line graph
function AnalyticsGraphic({ seed }: { seed: number }) {
  const points = Array.from({ length: 8 }).map((_, i) => ({
    x: 120 + i * 80,
    y: 200 - s(seed, i) * 130 - 20,
  }));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  return (
    <>
      {/* Grid lines */}
      {[0,1,2,3].map(i => (
        <line key={i} x1={100} y1={60+i*45} x2={700} y2={60+i*45} stroke={line} strokeWidth="1" opacity="0.5" />
      ))}
      {/* Bars */}
      {points.map((p, i) => (
        <rect key={i} x={p.x-15} y={p.y} width={30} height={200-p.y} rx={4}
          fill={gold} opacity={0.15 + s(seed, i + 10) * 0.15} />
      ))}
      {/* Line */}
      <path d={pathD} stroke={accent} strokeWidth="3" fill="none" strokeLinejoin="round" opacity="0.7" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={5} fill={accent} opacity="0.8" />
      ))}
    </>
  );
}

// Chatbot: chat bubbles stacked
function ChatbotGraphic({ seed }: { seed: number }) {
  return (
    <>
      {/* Bot bubble */}
      <rect x={200} y={50} width={250} height={60} rx={14} fill="white" opacity="0.6" />
      <polygon points="220,110 240,110 210,130" fill="white" opacity="0.6" />
      <rect x={220} y={65} width={160} height={8} rx={4} fill={fg} opacity="0.08" />
      <rect x={220} y={82} width={120+s(seed,0)*40} height={8} rx={4} fill={fg} opacity="0.06" />
      {/* User bubble */}
      <rect x={350} y={140} width={200} height={50} rx={14} fill={gold} opacity="0.35" />
      <polygon points="530,190 510,190 540,210" fill={gold} opacity="0.35" />
      <rect x={370} y={155} width={140+s(seed,1)*20} height={8} rx={4} fill={fg} opacity="0.06" />
      {/* Bot response */}
      <rect x={200} y={220} width={300} height={60} rx={14} fill="white" opacity="0.5" />
      <rect x={220} y={235} width={200} height={8} rx={4} fill={fg} opacity="0.08" />
      <rect x={220} y={252} width={140+s(seed,2)*60} height={8} rx={4} fill={accent} opacity="0.3" />
      {/* Bot avatar */}
      <circle cx={175} cy={75} r={18} fill={accent} opacity="0.5" />
    </>
  );
}

// Funnel: actual funnel shape with stages
function FunnelGraphic({ seed }: { seed: number }) {
  return (
    <>
      <path d="M200 50 L600 50 L520 130 L280 130 Z" fill={fg} opacity="0.04" />
      <path d="M280 140 L520 140 L470 210 L330 210 Z" fill={fg} opacity="0.08" />
      <path d="M330 220 L470 220 L440 270 L360 270 Z" fill={gold} opacity="0.4" />
      <rect x={300} y={70} width={200} height={10} rx={4} fill={fg} opacity="0.06" />
      <rect x={340} y={160} width={120} height={10} rx={4} fill={fg} opacity="0.06" />
      <rect x={370} y={237} width={60} height={10} rx={4} fill={accent} opacity="0.6" />
      {/* Arrow */}
      <path d="M400 55 L400 265" stroke={accent} strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
      <polygon points="393,260 400,275 407,260" fill={accent} opacity="0.4" />
    </>
  );
}

// Learn: book + graduation cap style
function LearnGraphic({ seed }: { seed: number }) {
  return (
    <>
      {/* Open book */}
      <path d="M400 80 Q300 90 250 100 L250 240 Q300 230 400 220 Z" fill="white" opacity="0.5" />
      <path d="M400 80 Q500 90 550 100 L550 240 Q500 230 400 220 Z" fill="white" opacity="0.6" />
      <line x1={400} y1={80} x2={400} y2={220} stroke={line} strokeWidth="1.5" opacity="0.4" />
      {/* Lines on pages */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={280} y={115+i*22} width={90+s(seed,i)*20} height={6} rx={3} fill={fg} opacity="0.06" />
          <rect x={420} y={115+i*22} width={80+s(seed,i+5)*30} height={6} rx={3} fill={fg} opacity="0.06" />
        </g>
      ))}
      {/* Bookmark */}
      <path d="M530 100 L530 140 L540 130 L550 140 L550 100" fill={accent} opacity="0.5" />
    </>
  );
}

// Strategy: chess board / grid with pieces
function StrategyGraphic({ seed }: { seed: number }) {
  return (
    <>
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={200+c*68} y={50+r*55} width={60} height={48} rx={6}
            fill={(r + c) % 2 === 0 ? 'white' : fg} opacity={(r + c) % 2 === 0 ? 0.4 : 0.03} />
        ))
      )}
      {/* Key piece highlighted */}
      <circle cx={200+Math.floor(s(seed,0)*6)*68+30} cy={50+Math.floor(s(seed,1)*4)*55+24} r={16} fill={accent} opacity="0.5" />
      <circle cx={200+Math.floor(s(seed,2)*6)*68+30} cy={50+Math.floor(s(seed,3)*4)*55+24} r={12} fill={gold} opacity="0.3" />
    </>
  );
}

// Business: building blocks / storefront
function BusinessGraphic({ seed }: { seed: number }) {
  return (
    <>
      {/* Building */}
      <rect x={280} y={80} width={240} height={180} rx={8} fill="white" opacity="0.5" />
      <rect x={280} y={60} width={240} height={30} rx={6} fill={accent} opacity="0.35" />
      {/* Windows */}
      {[0,1,2].map(r => [0,1,2].map(c => (
        <rect key={`${r}-${c}`} x={300+c*70} y={100+r*50} width={50} height={35} rx={4}
          fill={r === 1 && c === 1 ? gold : fg} opacity={r === 1 && c === 1 ? 0.25 : 0.04} />
      )))}
      {/* Door */}
      <rect x={370} y={220} width={60} height={40} rx={4} fill={accent} opacity="0.3" />
      {/* Growth arrow */}
      <path d="M580 220 L620 100" stroke={accent} strokeWidth="3" opacity="0.4" />
      <polygon points="615,95 625,95 620,82" fill={accent} opacity="0.5" />
    </>
  );
}

// Community: group of people circles
function CommunityGraphic({ seed }: { seed: number }) {
  const positions = [
    { x: 300, y: 130, r: 30 }, { x: 400, y: 100, r: 35 }, { x: 500, y: 130, r: 30 },
    { x: 350, y: 190, r: 25 }, { x: 450, y: 190, r: 25 },
    { x: 250, y: 180, r: 20 }, { x: 550, y: 180, r: 20 },
  ];
  return (
    <>
      {/* Connection lines */}
      {positions.map((p, i) =>
        positions.slice(i + 1).filter((_, j) => (i + j) % 2 === 0).map((q, j) => (
          <line key={`${i}-${j}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y}
            stroke={accent} strokeWidth="1.5" opacity="0.15" />
        ))
      )}
      {positions.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.r} fill={i === 1 ? accent : 'white'} opacity={i === 1 ? 0.5 : 0.5} />
          <circle cx={p.x} cy={p.y - p.r * 0.25} r={p.r * 0.3} fill={fg} opacity="0.06" />
        </g>
      ))}
    </>
  );
}

// Tools: wrench + gears
function ToolsGraphic({ seed }: { seed: number }) {
  return (
    <>
      {/* Large gear */}
      <circle cx={350} cy={140} r={60} stroke={accent} strokeWidth="4" fill="white" opacity="0.4" />
      <circle cx={350} cy={140} r={25} fill={accent} opacity="0.3" />
      {[0, 45, 90, 135].map(a => (
        <rect key={a} x={345} y={72} width={10} height={136} rx={5}
          fill={accent} opacity="0.25" transform={`rotate(${a} 350 140)`} />
      ))}
      {/* Small gear */}
      <circle cx={480} cy={110} r={35} stroke={gold} strokeWidth="3" fill="white" opacity="0.4" />
      <circle cx={480} cy={110} r={14} fill={gold} opacity="0.3" />
      {[0, 60, 120].map(a => (
        <rect key={a} x={477} y={70} width={6} height={80} rx={3}
          fill={gold} opacity="0.25" transform={`rotate(${a} 480 110)`} />
      ))}
      {/* Settings lines */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={550} y={90+i*35} width={120} height={8} rx={4} fill={fg} opacity="0.05" />
          <circle cx={580+s(seed,i)*80} cy={94+i*35} r={6} fill={accent} opacity="0.5" />
        </g>
      ))}
    </>
  );
}

// Default: abstract meaningful shapes
function DefaultGraphic({ seed }: { seed: number }) {
  return (
    <>
      {/* Stacked cards */}
      {[0, 1, 2].map(i => (
        <rect key={i} x={250 + i * 30} y={60 + i * 25} width={280} height={160} rx={12}
          fill={i === 2 ? 'white' : fg} opacity={i === 2 ? 0.6 : 0.03} />
      ))}
      <rect x={330} y={135} width={140} height={10} rx={4} fill={fg} opacity="0.1" />
      <rect x={330} y={155} width={100+s(seed,0)*60} height={8} rx={4} fill={fg} opacity="0.06" />
      <rect x={330} y={175} width={80+s(seed,1)*40} height={8} rx={4} fill={fg} opacity="0.06" />
      <rect x={330} y={200} width={70} height={22} rx={6} fill={accent} opacity="0.4" />
    </>
  );
}
