const Avatar3 = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Maggie L</title>
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
        <rect width="36" height="36" fill="#0c8f8f" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(4 4) rotate(60 18 18) scale(1)"
          fill="#ffad08"
          rx="36"
        />
        <g transform="translate(-4 0) rotate(0 18 18)">
          <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000" />
          <rect
            x="14"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          />
          <rect
            x="20"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          />
        </g>
      </g>
    </svg>
  );
};

export default Avatar3;
