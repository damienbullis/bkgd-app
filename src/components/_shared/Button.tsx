import { ButtonHTMLAttributes } from 'react'

const Button = ({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={className ? className + ' ' : '' + 'clr'} {...rest}>
      {children}
    </button>
  )
}

export default Button
