import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignments/assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?:Assignment;

  constructor(private assignmentsService:AssignmentsService,
              private route: ActivatedRoute,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    // avant affichage on doit récupérer la valeur du id dans l'URL
    // le "+" force la conversion en number
    const id:number = +this.route.snapshot.params['id'];
    //console.log("ID = " + id);

    // Puis à partir de l'id on demandera au service de nous renvoyer
    // l'assignment correspondant....
    this.assignmentsService.getAssignment(id)
    .subscribe(assignment => {
      this.assignmentTransmis = assignment;
    })
  }

  onAssignmentRendu() {
    if(this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(response => {
        console.log(response.message);
        this.router.navigate(["/home"]);
      })
    }
  }

  onDelete() {
    // on envoie un evenement au papa
    if(this.assignmentTransmis) {
       this.assignmentsService.deleteAssignment(this.assignmentTransmis)
       .subscribe(message => {
          console.log(message);
          this.router.navigate(["/home"]);
        });
        this.assignmentTransmis = undefined;
    }
  }
  onClickEdit()
  {
    this.router.navigate(["assignment",this.assignmentTransmis?.id,"edit"],
    {
      queryParams:{test:"test?"},
      fragment:'edit'
    }
    );
  }
  isAdmin():boolean
  {
    return this.authService.loggedIn;
  }

}
