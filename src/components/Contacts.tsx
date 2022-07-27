import Link from 'next/link';
import type { ReactNode } from 'react';

interface ContactProps {
  contacts: {
    name: string;
    href: string;
    internal?: boolean;
    logo?: ReactNode;
  }[];
  className?: string;
}

const Contacts = function Contacts({ contacts, className }: ContactProps) {
  return (
    <div className={`mt-5 text-gray-400 text-2xl font-mono ${className || ''}`}>
      {contacts.map(({ internal = false, href, name, logo: Logo = false }, index) => {
        return (
          <p
            key={index}
            style={{ display: 'inline-block', marginLeft: index === 0 ? '0' : '1.5rem' }}
            className='group'
          >
            {Logo === false ? null : (
              <a
                {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}
                tabIndex={-1}
                href={href}
              >
                {Logo}
              </a>
            )}
            <Link href={href} {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })}>
              <a className='group-hover:border-b-slate-400 border-b-2 border-b-slate-500 group-hover:transition-all transition-all'>
                {name}
              </a>
            </Link>
            {index === contacts.length - 1 ? null : ' · '}
          </p>
        );
      })}
    </div>
  );
};

export default Contacts;
