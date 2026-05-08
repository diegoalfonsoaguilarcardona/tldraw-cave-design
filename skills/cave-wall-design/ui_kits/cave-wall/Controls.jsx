function Chip({ children, tone = 'bone' }) {
  const styles = {
    bone:     { background:'rgba(239,227,199,.88)', color:'var(--charcoal)', border:'2px solid var(--charcoal)' },
    charcoal: { background:'var(--charcoal)',        color:'var(--bone)',     border:'2px solid var(--bone)' },
    red:      { background:'var(--ochre-red)',       color:'var(--bone)',     border:'2px solid var(--ochre-deep)' },
    yellow:   { background:'var(--ochre-yellow)',    color:'var(--charcoal)', border:'2px solid var(--charcoal)' },
  };
  return (
    <span style={{
      display:'inline-block', padding:'6px 14px',
      fontFamily:'var(--font-stamp)', fontSize:14,
      letterSpacing:'.08em', textTransform:'uppercase',
      filter:'url(#rough)',
      ...styles[tone],
    }}>{children}</span>
  );
}

function Button({ children, variant = 'primary', size = 'md', onClick }) {
  const base = {
    display:'inline-flex', alignItems:'center', gap:10,
    fontFamily:'var(--font-stamp)',
    letterSpacing:'.08em', textTransform:'uppercase',
    border:'3px solid var(--charcoal)',
    cursor:'pointer', filter:'url(#rough)',
    padding: size === 'sm' ? '6px 14px' : '10px 20px',
    fontSize: size === 'sm' ? 13 : 15,
  };
  const variants = {
    primary: { background:'var(--ochre-yellow)', color:'var(--charcoal)' },
    strong:  { background:'var(--ochre-red)',    color:'var(--bone)', borderColor:'var(--ochre-deep)' },
    ghost:   { background:'transparent',         color:'var(--bone)',     borderColor:'var(--bone)' },
  };
  return <button onClick={onClick} style={{...base, ...variants[variant]}}>{children}</button>;
}

window.Chip = Chip;
window.Button = Button;
