/**
 * Button Component
 * Reusable button with multiple variants
 */
export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
  }

  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
