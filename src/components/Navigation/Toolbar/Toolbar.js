import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo'
import NavigationItem from '../NavigationItems/NavigationItems';

const toolbar = () => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <NavigationItem />
        </nav>
    </header>
);

export default toolbar;