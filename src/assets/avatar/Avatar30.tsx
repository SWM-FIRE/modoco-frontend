const Avatar30 = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <title>Lady Deborah</title>
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
        <rect width="36" height="36" fill="#e0f8c3" />
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(1 7) rotate(283 18 18) scale(1.1)"
          fill="#d0e8fc"
          rx="36"
        />
        <g transform="translate(-3 3.5) rotate(-3 18 18)">
          <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000" />
          <rect
            x="11"
            y="14"
            width="1.5"
            height="2"
            rx="1"
            stroke="none"
            fill="#000000"
          />
          <rect
            x="23"
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
export default Avatar30;
