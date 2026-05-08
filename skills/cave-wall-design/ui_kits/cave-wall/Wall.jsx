function Wall({ children, padded = true }) {
  return (
    <div style={{
      position:'relative', width:'100%', height:'100%',
      background:
        'radial-gradient(ellipse 85% 60% at 50% 55%, rgba(255,160,60,.18), transparent 60%),' +
        'radial-gradient(circle at 20% 15%, var(--stone-4), var(--stone-2) 45%, var(--stone-1) 80%),' +
        'linear-gradient(180deg, var(--stone-2), var(--stone-1) 70%, var(--stone-0))',
      overflow:'hidden', color:'var(--bone)',
    }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:"url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='4'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0 0.05  0 0 0 .55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\"),url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='1200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='3' seed='9'/><feColorMatrix values='0 0 0 0 0.4  0 0 0 0 0.25  0 0 0 0 0.1  0 0 0 .35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        mixBlendMode:'multiply', opacity:.85 }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none',
        background:'radial-gradient(ellipse 70% 55% at 50% 50%, transparent 40%, rgba(0,0,0,.55) 85%, rgba(0,0,0,.85) 100%), radial-gradient(circle at 8% 92%, rgba(255,120,40,.18), transparent 30%), radial-gradient(circle at 92% 8%, rgba(255,120,40,.14), transparent 30%)' }} />
      <div style={{ position:'relative', zIndex:1, padding: padded ? '32px 44px' : 0, height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column' }}>
        {children}
      </div>
    </div>
  );
}

window.Wall = Wall;
