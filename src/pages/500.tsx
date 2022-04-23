import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/not-found.module.scss';
import Paragraph from '../components/Paragraph';
import coolBgStyles from '../styles/cool-bg.module.scss';

const InternalServerError: NextPage = function InternalServerError() {
  return (
    <div className={`${styles['not-found-container']} ${coolBgStyles['cool-bg']}`}>
      <Head>
        <title>404 - Not Found</title>
      </Head>

      <main className={styles['not-found-content']}>
        <h1 className='text-6xl md:text-7xl lg:text-9xl text-center'>🤔</h1>
        <Paragraph className='text-2xl md:text-3xl lg:text-4xl text-white mx-auto text-center'>
          500 | An internal server error just occurred. Try{' '}
          <button
            className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-blue-700 hover:border-blue-500 cursor-pointer rounded-lg outline-none par'
            onClick={() => window.location.reload()}
          >
            Refreshing
          </button>
        </Paragraph>
      </main>
    </div>
  );
};

export default InternalServerError;
