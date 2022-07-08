const Avatar9 = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Harriet Tubman</title>
      <mask
        id="mask__beam"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="36"
        height="36"
      >
        <rect width="36" height="36" rx="72" fill="#FFFFFF" />
      </mask>
      <g mask="url(#mask__beam)">
        <rect width="36" height="36" fill="#edd75a" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(8 8) rotate(278 18 18) scale(1.2)"
          fill="#0c8f8f"
          rx="6"
        />
        <g transform="translate(4 4) rotate(-8 18 18)">
          <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#FFFFFF" />
          <rect
            x="11"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#FFFFFF"
          />
          <rect
            x="23"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#FFFFFF"
          />
        </g>
      </g>
    </svg>
  );
};
export default Avatar9;
