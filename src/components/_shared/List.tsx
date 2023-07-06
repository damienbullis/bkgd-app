import { HTMLAttributes } from 'react'

const List = ({
  listType = 'ul',
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLOListElement | HTMLUListElement> & {
  listType?: 'ul' | 'ol'
}) => {
  const Tag = listType
  return (
    <Tag className={(className ? className + ' ' : '') + 'clr'} {...rest}>
      {children}
    </Tag>
  )
}

export default List
