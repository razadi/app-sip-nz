export class IArea {
  public emp?: string;
  public cve?: number;
  public name?: string;
  public owner?: string;
}

export class IDato {
  public clave?: number;
  public descri?: string;
  public valor?: number;
  public unidad?: number;
  public encargado?: number;
  public precargado?: number;
}

export class IPeriod {
  public emp?: string;
  public cve?: number;
  public period?: string;
  public begin?: string;
  public end?: string;
  public type?: number;
}

export class IStage {
  public clave?: string;
  public nombre?: string;
  public valord?: number;
  public valora?: number;
}

export class INivel {
  public id?: number;
  public name?: string;
  public perm?: string;
}

export class IFactor {
  public clave?: number;
  public descripcion?: string;
  public factor?: string;
  public precargado?: number;
}

export class IUnidad {
  public clave?: number;
  public descri?: string;
  public corto?: string;
  public s1?: string;
  public v1?: number;
  public s2?: string;
  public v2?: number;
  public s3?: string;
  public v3?: number;
  public s4?: string;
  public v4?: number;
  public s5?: string;
  public v5?: number;
  public s6?: string;
  public v6?: number;
  public precargado?: number;
}
