export class ILogin {
  user: IUser;
  token: string;
}
export class IUser {
  usu_logi?: string;
  emp_id?: number;
  usu_pass?: string;
  usu_nive?: string;
  usu_nomb?: string;
  usu_mail?: string;
  usu_alta?: Date;
  usu_edou?: string;
  usu_baja?: Date;
  usu_medo?: string;
  usu_acti?: string;
}