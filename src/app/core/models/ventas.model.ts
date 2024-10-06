export class IEstrategia {
  est_id?: number;
  emp_id?: number;
  est_name?: string;
  est_meta?: string;
  est_etap?: string;
  est_clie?: ICliente;
  est_vede?: IVendedor;
  est_feca?: string;
  est_usua?: string;
  etapa?: string;
}

export class ICliente {
  cli_cve?: string;
  cli_rfc?: string;
  cli_raso?: string;  
}

export class IVendedor{
  ved_cve?: string;
  ved_raso?: string;
}

export class IActividad {
  est_id?: number;
  emp_id?: number;
  ess_id?: number;
  ess_orde?: number;
  ess_tipo?: string;
  ess_subt?: string;
  ess_esta?: string;
  ess_titu?: string;
  ess_desc?: string;
  ess_agen?: string;
  ess_feca?: string;
  ess_usua?: string;
  estatus?: string;
  tipo?: string;
  subtipo?: string;
  fecha?: string;
  aviso?: string;
  age_tipo?: string;
  age_feca?: string;
  age_tima?: string;
  age_fecd?: string;
  age_timd?: string;
  age_reco?: string;
  age_trec?: string;
  age_fecr?: string;
  age_timr?: string;
}