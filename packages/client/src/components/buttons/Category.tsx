import React from 'react';
import Link from 'next/link';

import CategoriesIcon from '@client/components/icons/CategoriesIcon';

type CategoryBtnProps = {
  href: string;
};

const Category: React.FC<CategoryBtnProps> = ({ href }) => {
  return (
    <Link href={href}>
      <CategoriesIcon />
    </Link>
  );
};

export default Category;
