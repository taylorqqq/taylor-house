import { getAction, postAction } from "../manage";
const userRegister = (params: any) => postAction("/users/register", params);
const userLogin = (params: any) => postAction("/users/login", params);
const userList = (params: any) => getAction("/users/user-list", params);

export { userLogin, userRegister, userList };
