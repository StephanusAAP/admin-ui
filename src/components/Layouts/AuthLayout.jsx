import React, {useContext} from 'react';
import Logo from '../Elements/Logo';
import { ThemeContext } from '../../context/themeContext';

function AuthLayout(Props) {
  const { children, title } = Props; 
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <main className={`min-h-screen bg-special-mainBg flex justify-center items-center ${theme.name}`}>
        {/* container start */}
        <div className="max-w-md w-full p-6">
          <Logo />
          
          <h1 className="text-xl font-bold text-center text-slate-800 mt-4 mb-2">
            {title}
          </h1>

          {children} 
          
        </div>
        {/* container end */}
      </main>
    </>
  );
}

export default AuthLayout;