/**
 * Card Component
 * Glass-morphic card wrapper
 */
export const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <div
      className={`glass rounded-[14px] border border-white/6 p-5 ${hover ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
