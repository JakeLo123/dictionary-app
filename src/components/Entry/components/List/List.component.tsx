import { ReactNode } from 'react';

function List({
  ariaLabelledby,
  children,
  className
}: {
  ariaLabelledby: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <ul className={className} aria-labelledby={ariaLabelledby}>
      {children}
    </ul>
  );
}

List.defaultProps = { className: '' };

export default List;
