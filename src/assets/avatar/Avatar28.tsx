const Avatar28 = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Mary Walton</title>
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
        <rect width="36" height="36" fill="#f0e2c9" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(-2 -2) rotate(226 18 18) scale(1.1)"
          fill="#f8f1c3"
          rx="36"
        />
        <g transform="translate(-2 -6) rotate(-6 18 18)">
          <path
            d="M15 20c2 1 4 1 6 0"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="13"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          />
          <rect
            x="21"
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
export default Avatar28;
