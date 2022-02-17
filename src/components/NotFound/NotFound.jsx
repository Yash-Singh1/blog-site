import { useEffect } from 'react';
import '../../styles/not-found.css';
import Paragraph from '../Profile/Paragraph';

function NotFound() {
  useEffect(() => {
    document.documentElement.classList.add('not-found');

    return () => document.documentElement.classList.remove('not-found');
  }, []);

  return (
    <div>
      <h1 className='text-6xl md:text-7xl lg:text-9xl text-center'>🤪</h1>
      <Paragraph className='text-2xl md:text-3xl lg:text-6xl text-white mx-auto'>
        Whoops! Looks like I can't find what you are looking for... Or I am cooking it up
      </Paragraph>
    </div>
  );
}

export default NotFound;
