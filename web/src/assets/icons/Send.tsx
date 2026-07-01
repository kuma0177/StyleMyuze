const SendIcon = ({ width = 44, height = 44, color = 'white', bgColor = 'black' }) => (
  <svg width={width} height={height} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="22" fill={bgColor}/>
    <path fillRule="evenodd" clipRule="evenodd" d="M22.4416 16.5581C22.1975 16.314 21.8018 16.314 21.5577 16.5581L18.2244 19.8914C17.9803 20.1355 17.9803 20.5312 18.2244 20.7753C18.4685 21.0194 18.8642 21.0194 19.1083 20.7753L21.3747 18.5089V27C21.3747 27.3452 21.6545 27.625 21.9997 27.625C22.3449 27.625 22.6247 27.3452 22.6247 27V18.5089L24.8911 20.7753C25.1351 21.0194 25.5309 21.0194 25.7749 20.7753C26.019 20.5312 26.019 20.1355 25.7749 19.8914L22.4416 16.5581Z" fill={color}/>
  </svg>
);
export default SendIcon;
