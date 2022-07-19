import { getAction, postAction } from "../manage";
const userLogin = (params: any) => postAction("/users/login", params);

export { userLogin };
