const CategoryIcon = ({ color = "#565656" }: { color: string }) => {
  return (
    <svg
      width="22"
      height="26"
      viewBox="0 0 22 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="User">
        <circle
          id="Ellipse 33"
          cx="5.55988"
          cy="5.55988"
          r="5.55988"
          transform="matrix(-1 0 0 1 16.7898 1)"
          stroke={color}
          stroke-width="2"
        />
        <path
          id="Rectangle 2"
          d="M1.5 20.0441C1.5 18.8482 2.25177 17.7814 3.37798 17.3792V17.3792C8.45547 15.5658 14.0041 15.5658 19.0816 17.3792V17.3792C20.2078 17.7814 20.9596 18.8482 20.9596 20.0441V22.6938C20.9596 23.9109 19.8816 24.8458 18.6767 24.6737L15.0482 24.1553C12.5154 23.7935 9.94414 23.7935 7.41141 24.1553L3.78284 24.6737C2.57797 24.8458 1.5 23.9109 1.5 22.6938V20.0441Z"
          stroke={color}
          stroke-width="2"
        />
      </g>
    </svg>
  );
};

export default CategoryIcon;
