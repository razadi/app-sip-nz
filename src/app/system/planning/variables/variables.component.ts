import { Component, OnInit } from '@angular/core';

export interface TreeNodeInterface {
  key: string;
  icon: string;
  name: string;
  desc?: string;
  tipo: string;
  area: string;
  expand?: boolean;
  level?: number;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {

  listOfMapData: TreeNodeInterface[] = [
    {
      key: `0`,
      icon: `si:home`,
      name: 'Nombre de la empresa',
      desc: '',
      tipo: '',
      area: 'Dirección General',
      children: [
        {
          key: `0-1`,
          icon: 'si:vari',
          name: 'CUMPLIMIENTO REGULATORIO',
          desc: 'Regulaciones en materia energética, fiscal, técnica, social, laboral que rigen la operatividad de la empresa.',
          tipo: 'Variable',
          area: 'Subdirección de Administración',
        },
        {
          key: `0-2`,
          icon: 'si:vari',
          name: 'ENFOQUE COMERCIAL',
          desc: 'Generación de valor, enfoque de negocio, preciso, tangible, palpable, objetivo, orientado a resultados.',
          tipo: 'Variable',
          area: 'Subdirección de Administración',
        },
        {
          key: `0-3`,
          icon: 'si:vari',
          name: 'ESTRUCTURA ORGANIZACIONAL',
          desc: 'Integracion del conjunto de elementos organizacionales orientados a un fin comun, (personal, atribuciones y responsabilidades establecidas).',
          tipo: 'Variable',
          area: 'Subdirección de Administración',
        },
        {
          key: `0-4`,
          icon: 'si:vari',
          name: 'ESTRUCTURA PAIS',
          desc: 'conjunto de condiciones politicas, sociales, economicas y de infraestructura que presenta un pais determinado.',
          tipo: 'Variable',
          area: 'Subdirección de Operaciones',
        },
        {
          key: `0-5`,
          icon: 'si:vari',
          name: 'GESTIÓN DE CALIDAD',
          desc: 'Estandares, medición, cumplimiento, satisfacción del cliente interno y externo.',
          tipo: 'Variable',
          area: 'Subdirección de Administración',
        },
        {
          key: `0-6`,
          icon: 'si:vari',
          name: 'GESTIÓN PROSPECTIVA',
          desc: 'Conjunto de acciones que guian la toma de decisiones, gestionando futuribles con orientación al cumplimiento de objetivos a largo plazo. ',
          tipo: 'Variable',
          area: 'Unidad de Prospectiv Estratégica',
        },
        {
          key: `0-7`,
          icon: 'si:vari',
          name: 'INNOVACIÓN',
          desc: 'Todo desarrollo de la empresa aplicado a los segmentos de mercado y los procesos de las unidades de negocio. ',
          tipo: 'Variable',
          area: 'Subdirección de Administración',
        },
        {
          key: `0-8`,
          icon: 'si:vari',
          name: 'POSICIONAMIENTO Y COMPETITIVIDAD',
          desc: 'Reconocimiento, filosofía y valores, experiencia del cliente, participación del mercado e innovadora.',
          tipo: 'Variable',
          area: 'Unidad de Prospectiva Estratégica',
        },
        {
          key: `0-9`,
          icon: 'si:vari',
          name: 'RENTABILIDAD/SOLIDEZ FINANCIERA',
          desc: 'Márgenes de utilidad, apalancamiento financiero, tasa de retorno y equilibrio presupuestal.',
          tipo: 'Variable',
          area: 'Subdirección de Operaciones',
        },
        {
          key: `0-10`,
          icon: 'si:vari',
          name: 'TALENTO HUMANO',
          desc: 'Colaboradores que contribuyen al cumplimiento de los objetivos de la empresa. ',
          tipo: 'Variable',
          area: 'Dirección General',
        },
        {
          key: `0-11`,
          icon: 'si:vari',
          name: 'TECNOLOGÍA',
          desc: 'Recursos que mejoran los procesos, colaboran en el logro de los objetivos de la empresa y coadyuvan a su permanencia.',
          tipo: 'Variable',
          area: 'Subdirección de Operaciones',
          children: [
            {
              key: `0-11-1`,
              icon: 'si:vari',
              name: 'Ambiente organizacional',
              desc: '',
              tipo: 'Variable',
              area: 'Subdirección de Operaciones'
            },
            {
              key: `0-11-2`,
              icon: 'si:vari',
              name: 'Atracción',
              desc: '',
              tipo: 'Variable',
              area: 'Subdirección de Operaciones'
            },
            {
              key: `0-11-3`,
              icon: 'si:vari',
              name: 'Capacitación',
              desc: '',
              tipo: 'Variable',
              area: 'Subdirección de Operaciones'
            },
            {
              key: `0-11-4`,
              icon: 'si:vari',
              name: 'Retención',
              desc: '',
              tipo: 'Variable',
              area: 'Subdirección de Operaciones'
            }
          ]
        },
        {
          key: `0-12`,
          icon: 'si:vari',
          name: 'UNIDADES DE NEGOCIO ',
          desc: 'Gestora de productos y/o servicios  dedicados a la satisfacción de necesidades actuales o futuras del consumidor tipificado de energéticos. ',
          tipo: 'Variable',
          area: 'Subdirección de Administración',
        },
        {
          key: `0-13`,
          icon: 'si:vari',
          name: 'SEGURIDAD',
          desc: 'Preservar la integridad física y patrimonial propia, de clientes y de terceros.',
          tipo: 'Variable',
          area: 'Dirección General',
        }
      ]
    }
  ];

  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  constructor() { }

  ngOnInit(): void {
    console.log(this.listOfMapData);
    
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
      console.log(this.mapOfExpandedData[item.key]);
      
    });
    console.log(this.mapOfExpandedData);
    
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

}
