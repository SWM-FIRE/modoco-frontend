function Avatar22() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Hedy Lamarr</title>
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
        <rect width="36" height="36" fill="#d6c8f2" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(-3 -3) rotate(87 18 18) scale(1)"
          fill="#e9bdbd"
          rx="36"
        />
        <g transform="translate(-7 -1) rotate(-7 18 18)">
          <path
            d="M15 19c2 1 4 1 6 0"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="12"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          />
          <rect
            x="22"
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
}
export default Avatar22;
