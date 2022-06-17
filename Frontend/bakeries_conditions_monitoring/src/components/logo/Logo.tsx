import React from 'react';
import logoImage from 'components/logo/logo.png';
import { Link } from 'react-router-dom';

export const Logo: React.FC<{
  width: number;
  height: number;
}> = ({ width, height }) => {
  return (
    <Link to={'/'}>
      <img src={logoImage} alt="logo" style={{ width: `${width}px`, height: `${height}px` }} />
    </Link>
  );
};
