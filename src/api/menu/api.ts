import { getAction, postAction } from "../manage";
const addMenu = (params: any) => postAction("/menu/add", params);
const getmenuList = (params: any) => getAction("/menu/menu-list", params);

export { addMenu, getmenuList };
