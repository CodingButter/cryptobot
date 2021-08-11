import './style.css'

function Textography({
  style,
  className,
  variant,
  children
}) {
  const classname = `${
    className ? className + ' ' : ''
  }textography ${variant ? variant : 'base'}`
  return (
    <p style={style} className={classname}>
      {children}
    </p>
  )
}

export default Textography
