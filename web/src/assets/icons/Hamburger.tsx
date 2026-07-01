const HamburgerIcon = ({ width = 24, height = 24, color = '#030318' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M3 18H15" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
export default HamburgerIcon;
