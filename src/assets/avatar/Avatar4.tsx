function Avatar4() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Rosa Parks</title>
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
          transform="translate(-4 -4) rotate(148 18 18) scale(1.1)"
          fill="#0c8f8f"
          rx="36"
        />
        <g transform="translate(-4 -3) rotate(8 18 18)">
          <path
            d="M15 20c2 1 4 1 6 0"
            stroke="#FFFFFF"
            fill="none"
            strokeLinecap="round"
          />
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
}

export default Avatar4;
