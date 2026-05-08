function Frieze({ items = ['bison','spiral','paw','horse','dots','deer','spear','mammoth'], color = 'var(--charcoal)', opacity = .75 }) {
  const sizes = {
    bison:   [40, 24],
    mammoth: [44, 28],
    deer:    [34, 30],
    horse:   [40, 26],
    hand:    [24, 30],
    spiral:  [26, 26],
    paw:     [26, 26],
    dots:    [26, 26],
    spear:   [46, 14],
    sun:     [26, 26],
    chev:    [22, 16],
  };
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:28, color, opacity }}>
      {items.map((k, i) => {
        const [w, h] = sizes[k] || [26, 26];
        return <Pictograph key={i} id={`pg-${k}`} width={w} height={h} />;
      })}
    </div>
  );
}

window.Frieze = Frieze;
