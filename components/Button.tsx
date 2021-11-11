export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

const Button = ({
  className,
  children,
  ...otherProps
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
