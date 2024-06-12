interface GradientWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  wrapperclassname?: string;
}

const GradientWrapper = ({ children, ...props }: GradientWrapperProps) => (
  <div {...props} className={`relative ${props.className ?? ""}`}>
    <div
      className={`absolute m-auto blur-[200px] ${props.wrapperclassname}`}
      style={{
        background:
          "linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.984375) 0.01%, rgba(237, 78, 80, 0.2) 100%)",
      }}
    ></div>
    <div className="relative">{children}</div>
  </div>
);

export default GradientWrapper;
