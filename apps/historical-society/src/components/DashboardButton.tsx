const DashboardButton = ({
  className,
  tabIndex = 0,
  children,
  ...props
}: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  return (
    <button
      className={`text-lg underline hover:underline-offset-4 max-w-fit transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300 border border-[#0f0] px-2 py-1 disabled:opacity-70 disabled:no-underline disabled:hover:no-underline disabled:cursor-not-allowed ${className}`}
      {...props}
      tabIndex={tabIndex}
    >
      {children}
    </button>
  );
};
export default DashboardButton;
