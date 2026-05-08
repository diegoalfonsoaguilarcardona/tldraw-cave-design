/* Pictograph — thin wrapper over the shared <symbol> defs.
   Assumes the pictograph defs block is present on the page. */
function Pictograph({ id, color = 'currentColor', width, height, style, ...rest }) {
  return (
    <svg width={width} height={height} style={{ color, ...style }} {...rest}>
      <use href={`#${id}`} />
    </svg>
  );
}

window.Pictograph = Pictograph;
