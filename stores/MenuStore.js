import { observable, decorate } from "mobx";
import menuItems from "../utils/menuItems";
import { createContext } from "react";
import { maintenance, contact, user } from '../utils/icons';

const _items = [...menuItems, { title: 'פרופיל', iconUrl: user, urlTarget: '/edit' }, { title: 'צור קשר', iconUrl: contact, urlTarget: '/contact' }, { title: 'התנתק', iconUrl: maintenance, urlTarget: '/logout' }];

class MenuStore {
  active = false;
  items = _items;
  homeItems = menuItems;

  toggleMenu = () => {
    this.active = !this.active;
  }

  closeMenu = () => {
    this.active = false;
  }
}


decorate(MenuStore, {
  active: observable,
  items: observable,
  homeItems: observable
});

export default createContext(new MenuStore());