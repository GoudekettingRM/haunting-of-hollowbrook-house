const DashboardButton = ({
  className,
  tabIndex = 0,
  children,
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => {
  return (
    <p
      className={`text-lg underline hover:underline-offset-4 max-w-fit transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300 border border-[#0f0] px-2 py-1 ${className}`}
      {...props}
      tabIndex={tabIndex}
    >
      {children}
    </p>
  );
};
export default DashboardButton;
