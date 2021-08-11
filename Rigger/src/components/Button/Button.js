import './style.css'
export default function ({
  onClick,
  variant,
  children,
  className
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        variant ? variant : ''
      } ${className} button`}
    >
      {children}
    </button>
  )
}
