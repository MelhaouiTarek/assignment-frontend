import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  page: number=1;
 limit: number=5;
 totalDocs: number=0;
 totalPages: number=0;
 hasPrevPage: boolean=false;
 prevPage: number=0;
 hasNextPage: boolean=false;
 nextPage: number=0;

  titre = "Liste des assignments";
  couleur = "violet";

  assignments:Assignment[] = [];

  constructor(private assignmentService:AssignmentsService) { }

  // ngOnInit(): void {
  //   // appelé AVANT l'affichage (juste après le constructeur)
  //   console.log("AVANT AFFICHAGE");
  //   // on va demander au service de nous renvoyer les données (les assignments)
  //   // typiquement : le service envoie une requête AJAX sur un web service
  //   // du cloud...

  //   // TODO
  //   console.log("On demande les assignments au service")
  //   this.assignmentService.getAssignments()
  //   .subscribe(assignments => {
  //     // quand on rentre ici on sait que les données sont prêtes
  //     console.log("données reçues")
  //     this.assignments = assignments;
  //   });
  ngOnInit(): void {
    // appelé AVANT l'affichage (juste après le constructeur)
    console.log('AVANT AFFICHAGE');
    // on va demander au service de nous renvoyer les données (les assignments)
    // typiquement : le service envoie une requête AJAX sur un web service
    // du cloud...

    // TODO
    console.log('On demande les assignments au service');
    this.getAssignments()

    console.log('demande envoyée au service');
  }
getAssignments()
{
  this.assignmentService
  .getAssignmentsPagine(this.page, this.limit)
  .subscribe((data) => {
    // quand on rentre ici on sait que les données sont prêtes
    console.log('données reçues');
    this.assignments = data.docs;
    this.page = data.page;

    this.limit = data.limit;
    this.totalDocs = data.totalDocs;
    this.totalPages = data.totalPages;
    this.hasPrevPage = data.hasPrevPage;
    this.prevPage = data.prevPage;
    this.hasNextPage = data.hasNextPage;
    this.nextPage = data.nextPage;
    console.log('données reçues');
  });
}

  nextpage()
  {
    if(this.hasNextPage)
    {
      this.page=this.nextPage;
      this.getAssignments()
    }
  }
  prevpage()
  {
    if(this.hasPrevPage)
    {
      this.page=this.prevPage;
      this.getAssignments()
    }
  }
lastpage()
{
  this.page=this.totalPages;
  this.getAssignments()
}
firstpage()
{
  this.page=1;
  this.getAssignments()
}

}