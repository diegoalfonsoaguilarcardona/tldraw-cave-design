function Notice({ pictograph = 'bison', title, body, chip, chipTone = 'red' }) {
  return (
    <div style={{
      background:'radial-gradient(ellipse at 30% 20%, #f3e2b8, #d9bf89 70%, #a98651)',
      border:'3px solid rgba(60,30,10,.5)',
      boxShadow:'inset 0 0 30px rgba(90,50,10,.35), 0 4px 14px rgba(0,0,0,.5)',
      padding:20,
      display:'grid',
      gridTemplateColumns:'80px 1fr auto',
      gap:18,
      alignItems:'center',
      filter:'url(#rough)',
      color:'var(--charcoal)',
    }}>
      <div style={{ display:'flex', justifyContent:'center' }}>
        <Pictograph id={`pg-${pictograph}`} color="var(--ochre-deep)" width={80} height={60} />
      </div>
      <div>
        <div style={{ fontFamily:'var(--font-painted)', fontSize:26, color:'var(--ochre-deep)', lineHeight:1.1 }}>{title}</div>
        <div style={{ fontFamily:'var(--font-scrawl)', fontSize:22, color:'var(--charcoal)', marginTop:4, lineHeight:1.15 }}>{body}</div>
      </div>
      {chip && <Chip tone={chipTone}>{chip}</Chip>}
    </div>
  );
}

function HuntRow({ beast, day, tally, status, statusTone }) {
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'80px 1fr 120px 110px', gap:18,
      padding:'14px 18px',
      borderBottom:'1px dashed rgba(239,227,199,.25)',
      alignItems:'center',
    }}>
      <Pictograph id={`pg-${beast}`} color="var(--bone)" width={72} height={44} />
      <div>
        <div style={{ fontFamily:'var(--font-painted)', fontSize:20, color:'var(--ochre-yellow)' }}>{beast.toUpperCase()}</div>
        <div style={{ fontFamily:'var(--font-scrawl)', fontSize:20, color:'var(--bone)' }}>{day}</div>
      </div>
      <div style={{ fontFamily:'var(--font-scrawl)', fontSize:22, color:'var(--bone)' }}>{tally}</div>
      <Chip tone={statusTone}>{status}</Chip>
    </div>
  );
}

window.Notice = Notice;
window.HuntRow = HuntRow;
