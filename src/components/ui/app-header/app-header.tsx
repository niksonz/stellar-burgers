import React, { FC, useState } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
<<<<<<< HEAD
import { Link, NavLink, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation().pathname;
  let ref = '/';
  if (location.match(`/ingredients/`)) {
    ref = location;
  } else if (location === '/') {
    ref = location;
  }
=======
import { NavLink } from 'react-router-dom';
import { AppRoutes } from '../../app/appRoutes';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
<<<<<<< HEAD
            to={ref}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''} ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <BurgerIcon type={'primary'} />
=======
            to={AppRoutes.HOME}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            onClick={() => setActiveTab(AppRoutes.HOME)}
          >
            <BurgerIcon
              type={activeTab === AppRoutes.HOME ? 'primary' : 'secondary'}
            />
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
<<<<<<< HEAD
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          {userName ? (
            <NavLink
              to={'/profile'}
              className={({ isActive }) =>
                `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                  styles.link
                } ${isActive ? styles.link_active : ''}`
              }
              end={false}
            >
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </NavLink>
          ) : (
            <NavLink
              to={'/login'}
              className={({ isActive }) =>
                `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                  styles.link
                } ${isActive ? styles.link_active : ''}`
              }
              end={false}
            >
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </NavLink>
          )}
        </div>
=======

          <NavLink
            to={AppRoutes.FEED}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            onClick={() => setActiveTab(AppRoutes.FEED)}
          >
            <ListIcon
              type={activeTab === AppRoutes.FEED ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className='' />
        </div>

        <div className={styles.link_position_last}>
          <NavLink
            to={AppRoutes.PROFILE}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.link_active : ''}`
            }
            onClick={() => setActiveTab(AppRoutes.PROFILE)}
          >
            <ProfileIcon
              type={activeTab === AppRoutes.PROFILE ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
>>>>>>> a7e39045a1a65159b7b4f219ce84555adaa323c6
      </nav>
    </header>
  );
};
