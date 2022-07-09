function Avatar2() {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Amelia Boynton</title>
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
        <rect width="36" height="36" fill="#ffad08" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(6 6) rotate(332 18 18) scale(1.2)"
          fill="#73b06f"
          rx="6"
        />
        <g transform="translate(4 3) rotate(-2 18 18)">
          <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#000000" />
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

export default Avatar2;
