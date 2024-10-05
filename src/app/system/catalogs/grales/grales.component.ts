import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grales',
  templateUrl: './grales.component.html',
  styleUrls: ['./grales.component.scss']
})
export class GralesComponent implements OnInit {

  tabs = [
    {
      name: 'Tab 1',
      icon: 'folder',
      content: `<nz-table nzTemplateMode>
      <thead>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </tbody>
    </nz-table>`
    },
    {
      name: 'Tab 2',
      icon: 'folder',
      content: `<h1>Segundo data</h1>`
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
