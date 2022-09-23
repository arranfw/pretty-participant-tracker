import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import { Link } from '@remix-run/react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { ChevronDown } from '~/icons/chevron-down';

interface MenuProps {
  menuLabel: ReactNode;
  children: ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ menuLabel, children }) => {
  return (
    <div className='text-right'>
      <HeadlessMenu as='div' className='relative inline-block text-left'>
        <div>
          <HeadlessMenu.Button
            className={`
              inline-flex w-full justify-center rounded-md
              bg-black bg-opacity-20 px-4 py-2 text-sm font-medium
              text-white hover:bg-opacity-30 focus:outline-none
              focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75
            `}
          >
            {menuLabel}
            <ChevronDown
              className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
              aria-hidden='true'
            />
          </HeadlessMenu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform -translate-y-full opacity-0 scale-95'
          enterTo='transform -translate-y-full opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform -translate-y-full opacity-100 scale-100'
          leaveTo='transform -translate-y-full opacity-0 scale-95'
        >
          <HeadlessMenu.Items
            className={`
              absolute right-0 top-0 mt-2 divide-y
            divide-gray-100 rounded-md bg-white shadow-lg ring-1
            ring-black ring-opacity-5 focus:outline-none
            `}
          >
            <div className='px-1 py-1 '>{children}</div>
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
    </div>
  );
};

interface MenutItemProps {
  to: string;
  children: ReactNode;
}

export const MenuItem: React.FC<MenutItemProps> = ({ to, children }) => {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <Link
          to={to}
          className={`${
            active ? 'bg-violet-500 text-white' : 'text-gray-900'
          } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
        >
          {children}
        </Link>
      )}
    </HeadlessMenu.Item>
  );
};
