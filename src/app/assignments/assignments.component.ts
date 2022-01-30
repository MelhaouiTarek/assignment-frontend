import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  page: number=1;
 limit: number=10;
 totalDocs: number=0;
 totalPages: number=0;
 hasPrevPage: boolean=false;
 prevPage: number=0;
 hasNextPage: boolean=false;
 nextPage: number=0;

assignmentid: number=-1;

  titre = "Liste des assignments";
  couleur = "violet";

  assignments:Assignment[] = [];
  assignment?:Assignment;

  assignmentClick?:Assignment;
  constructor(private assignmentService:AssignmentsService,
              private router:Router,
              private authService:AuthService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog
            ) { }

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

delete(id:number)
{
  let dialogRef = this.dialog.open(DeleteDialogComponent);
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    if(result)
    {
      this.assignmentService.getAssignment(id)
      .subscribe((assignment) => {
        this.assignmentClick = assignment;
        if(this.assignmentClick) {
          this.assignmentService.deleteAssignment(this.assignmentClick)
          .subscribe(message => {
             console.log(message);
             this.getAssignments()
           });
      }
    })
    }
  });

   

}

onClick(index:number)
{
 if( this.assignmentid==index)
 {
  this.assignmentid=-1;
 }
 else
 {
  this.assignmentid=index;
 }
 
}
edit()
{
this.router.navigate(["/assignment/"+this.assignments[this.assignmentid].id+"/edit"]);
}
details()
{
this.router.navigate(["/assignment/"+this.assignments[this.assignmentid].id]);
}


isAdmin():boolean
{
  return this.authService.loggedIn;
}
toggleRendu()
{
  
  
  if(this.isAdmin())
  {
    this.assignment =this.assignments[this.assignmentid];
    if(this.assignment) {
      this.assignment.rendu = !this.assignment.rendu;
  
      this.assignmentService.updateAssignment(this.assignment)
      .subscribe(response => {
        console.log(response.message);
      })
    }
  }
  
}

}
