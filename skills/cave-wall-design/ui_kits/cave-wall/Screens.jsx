function NoticeWall({ onOpenLog }) {
  return (
    <Wall>
      <Frieze items={['bison','spiral','paw','horse','dots','deer','spear','mammoth','hand','sun']} color="var(--bone)" opacity={.5}/>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginTop:24, paddingBottom:14, borderBottom:'1px dashed rgba(239,227,199,.2)' }}>
        <div>
          <div style={{ fontFamily:'var(--font-painted)', fontSize:54, color:'var(--ochre-red)', textShadow:'2px 2px 0 rgba(0,0,0,.35)', lineHeight:.95, filter:'url(#rough)' }}>THE WALL</div>
          <div style={{ fontFamily:'var(--font-scrawl)', fontSize:28, color:'var(--bone)', opacity:.9 }}>day of full moon · tribe of the high cave</div>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Button onClick={onOpenLog}>Open hunt log</Button>
          <Button variant="ghost">Quiet time</Button>
        </div>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:12, marginTop:40, flex:1 }}>
        <Notice pictograph="mammoth" title="MAMMOTH SIGHTED" body="two of them, at the great river bend. send fast runners." chip="Urgent" chipTone="red"/>
        <Notice pictograph="sun" title="SUN RETURNS" body="cold days over. plants coming back to the green valley." chip="News" chipTone="yellow"/>
        <Notice pictograph="hand" title="NEW HAND ON WALL" body="little one pressed first mark today. pigment was red ochre." chip="Good" chipTone="yellow"/>
        <Notice pictograph="paw" title="BEAR NEAR CAVE" body="tracks at south mouth. two nights now. keep fire burning." chip="Watch" chipTone="red"/>
      </div>

      <Frieze items={['spear','bison','paw','horse','dots','deer','spiral','mammoth']} color="var(--bone)" opacity={.4}/>
    </Wall>
  );
}

function HuntLog({ onBack }) {
  return (
    <Wall>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <Button variant="ghost" size="sm" onClick={onBack}>◀ Wall</Button>
        <div style={{ fontFamily:'var(--font-painted)', fontSize:44, color:'var(--ochre-red)', textShadow:'2px 2px 0 rgba(0,0,0,.35)', filter:'url(#rough)' }}>HUNT LOG</div>
      </div>
      <div style={{ fontFamily:'var(--font-scrawl)', fontSize:24, color:'var(--bone)', opacity:.85, marginTop:6 }}>every beast. every moon. since fire began.</div>

      <div style={{ marginTop:20, flex:1, background:'rgba(26,18,10,.35)', border:'2px solid rgba(239,227,199,.2)' }}>
        <HuntRow beast="bison"   day="3 moons ago"    tally="III fists"  status="Feasted"  statusTone="yellow"/>
        <HuntRow beast="deer"    day="4 moons ago"    tally="I fist"     status="Shared"   statusTone="yellow"/>
        <HuntRow beast="mammoth" day="7 moons ago"    tally="II kills"   status="Feast"    statusTone="yellow"/>
        <HuntRow beast="horse"   day="9 moons ago"    tally="—"          status="Got away" statusTone="red"/>
        <HuntRow beast="bison"   day="11 moons ago"   tally="I fist"     status="Shared"   statusTone="yellow"/>
        <HuntRow beast="deer"    day="12 moons ago"   tally="II fists"   status="Feasted"  statusTone="yellow"/>
      </div>

      <div style={{ display:'flex', gap:10, marginTop:16 }}>
        <Button>Paint new entry</Button>
        <Button variant="strong">Call next hunt</Button>
        <div style={{ flex:1 }}/>
        <Chip>Total: VIII beasts</Chip>
      </div>
    </Wall>
  );
}

window.NoticeWall = NoticeWall;
window.HuntLog = HuntLog;
