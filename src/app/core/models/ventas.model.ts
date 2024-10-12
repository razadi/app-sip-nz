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

export class IEstSeguir {
  est_id?: number;
  emp_id?: number;
  ese_id?: number;
  ese_meta?: string;
  ese_feca?: string;
}

export class ICliente {
  cli_cve?: string;
  cli_rfc?: string;
  cli_raso?: string; 
  cli_site?: string; 
  cli_cont?: string;
  cli_movi?: string;
  cli_mail?: string;
  cli_dire?: string;
  cli_next?: string;
  cli_nint?: string;
  cli_colo?: string;
  cli_dele?: string;
  cli_copo?: string;
  cli_pais?: string;
  cli_enfe?: string;
  cli_domi?: string;
}

export class IVendedor{
  ved_cve?: string;
  ved_raso?: string;
  ved_rfc?: string;
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