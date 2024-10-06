export class IAccesos {
  clave: string;
  crud: string;
  id: number;
  link: string;
  title: string;
}

export class IAccesosTmp {
  owner: number;
  clave: string;
  id: number;
  title: string;
  new: boolean;
  sel: boolean;
  upd: boolean;
  del: boolean;
}

export class IAccesosResult {
  error: boolean;
  menu: any[];
  data: IAccesosTmp[];
}

export class IModules {
  planeacion: boolean;
  foda: boolean;
  tablero: boolean;
  centinela: boolean;
  radar: boolean;
}