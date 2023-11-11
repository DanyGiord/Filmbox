const CategoryIcon = ({ color = "#565656" }: { color: string }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Property 1=Default">
        <path
          id="Heart"
          d="M5.57844 17.3637L13.8572 25.813C15.0335 27.0136 16.9665 27.0136 18.1428 25.813L26.4216 17.3637C29.1928 14.5353 29.1928 9.94963 26.4216 7.12127C23.6503 4.29291 19.1572 4.29291 16.386 7.12127V7.12127C16.1741 7.33752 15.8259 7.33752 15.614 7.12127V7.12127C12.8428 4.29291 8.34969 4.29291 5.57844 7.12127C2.80719 9.94963 2.80719 14.5353 5.57844 17.3637Z"
          stroke={color}
          stroke-width="2"
        />
      </g>
    </svg>
  );
};

export default CategoryIcon;
