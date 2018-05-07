import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.scss']
})

export class OrganizationStructureComponent implements OnInit {

  departments = [
    { id: 1, name: "Qualquer" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" },
    { id: 1, name: "Outro" }
  ];
  organization: Organization;
  sectionExpanded: boolean = false;

  constructor() { }

  ngOnInit() {
    this.organization = <Organization> {
      
      legalName: "Nome Empresarial",
      tradeName: "Nome Fantasia",
      departments: [
        {
          id: 1,
          name: "Department 1",
          macroprocesses: [
            
          ]
        },
        {
          id: 2,
          name: "Department 2",
          macroprocesses: [
            { id: 1, name: "Macroprocesso de teste 1" }
          ]
        },
        {
          id: 3,
          name: "Department 3"
        },
        {
          id: 4,
          name: "Department 4"
        }
      ]
    };

  }

}


