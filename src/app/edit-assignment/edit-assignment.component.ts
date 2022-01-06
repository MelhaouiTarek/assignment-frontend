import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
    assignment?:Assignment;
    nomAssignment?:string;
    dateDeRendu?:Date;


  constructor(private route:ActivatedRoute,
    private assignmentsService:AssignmentsService,
    private router:Router
    ) { }

  ngOnInit(): void {

    // recup ?

    console.log("param? : ");
    console.log(this.route.snapshot.queryParams);
    console.log("test = " +this.route.snapshot.queryParams['test']);
    console.log("Fragment = " +this.route.snapshot.fragment);
      // avant affichage on doit récupérer la valeur du id dans l'URL
    // le "+" force la conversion en number
    const id:number = +this.route.snapshot.params['id'];
    //console.log("ID = " + id);

    // Puis à partir de l'id on demandera au service de nous renvoyer
    // l'assignment correspondant....
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => {
      this.assignment=assignment;
      this.nomAssignment=assignment?.nom;
      this.dateDeRendu=assignment?.dateDeRendu;
    })
  }
  
  onSaveAssignment()
  {
if(!this.assignment) return;
    if(this.nomAssignment ) {
    this.assignment.nom=this.nomAssignment;
    }
    if(this.dateDeRendu ) {
    this.assignment.dateDeRendu=this.dateDeRendu;
    }
    
    
    this.assignmentsService.updateAssignment(this.assignment)
    .subscribe(response =>
      {
        console.log(response.message);
        this.router.navigate(["/home"]);
      })

    
  }

}
