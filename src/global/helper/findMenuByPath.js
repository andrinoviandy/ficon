export const findMenuByPath = (menus, pathname) => {
  for (const menu of menus) {
    if (menu.path === pathname) return menu;

    if (menu.submenu?.length) {
      const sub = menu.submenu.find(
        (item) => item.path === pathname
      );

      if (sub) return sub;
    }
  }

  return null;
};