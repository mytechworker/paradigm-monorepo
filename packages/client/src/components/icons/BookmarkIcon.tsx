const BookmarkIcon = ({ fill = '#000', className }: { fill: string; className?: string }) => {
  return (
    <svg
      className={className}
      width="12"
      height="18"
      viewBox="0 0 15 18"
      fill={fill}
      stroke="#000"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.05566 1H13.0557V16.0568L8.21814 12.6014C7.52275 12.1047 6.58858 12.1047 5.89319 12.6014L1.05566 16.0568V1Z" />
    </svg>
  );
};

export default BookmarkIcon;
