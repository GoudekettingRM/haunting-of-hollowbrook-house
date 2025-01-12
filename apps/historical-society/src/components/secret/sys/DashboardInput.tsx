const DashboardInput = ({
  className,
  ...props
}: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
  return (
    <input
      className={`bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-300 border border-[#0f0] placeholder:text-[#0f0] placeholder:opacity-50 px-2 py-1 ${className}`}
      placeholder='Enter here...'
      {...props}
    />
  );
};
export default DashboardInput;
