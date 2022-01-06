import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignmentSelectionne?: Assignment = undefined;
  //url = "http://localhost:8010/api/assignments"
  url = "https://api-assignments-mt.herokuapp.com/api/assignments";
  assignments: Assignment[] = [
    {
      id: 1,
      nom: "Devoir Angular proposé par Mr Buffa",
      dateDeRendu: new Date("2022-01-23"),
      rendu: false
    },
    {
      id: 2,
      nom: "Devoir gestion de projet de Mr Winter",
      dateDeRendu: new Date("2022-01-10"),
      rendu: false
    },
    {
      id: 3,
      nom: "Devoir Hybride de Mr Pascal Bohn",
      dateDeRendu: new Date("2021-11-01"),
      rendu: true
    }
  ]

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  getAssignments(): Observable<Assignment[]> {
    // imaginons qu'on envoie une requête dans le cloud
    // et que le serveur à son tour envoie une requête sur une BD
    // dans le cloud... on en sait pas exactement combien de temps
    // cela va prendre....
    // On va donc non pas renvoyer les données, mais plutôt un objet "observable".
    //
    return this.http.get<Assignment[]>(this.url);

    //return of(this.assignments);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url + "/" + id)
      .pipe(
        map(a => {
          a.nom += " modifie dans un pipe";
          return a;
        }),
        tap(_ => {
          console.log("tap : name =" + _.nom);
        }),
        catchError(this.handleError<any>("catchError : get by id avec id=" + id))
      )
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.nom, "Ajouté");
    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // POUR LE MOMENT RIEN BESOIN DE FAIRE

    // Par la suite, on enverra une requête PUT dans le cloud
    // pour faire un update dans le base de données distante
    this.loggingService.log(assignment.nom, "Modifié");

    // return of("Service : assignment modifié avec succès");
    return this.http.put<Assignment>(this.url, assignment);

  }

  deleteAssignment(assignment: Assignment): Observable<any> {


    this.loggingService.log(assignment.nom, "Supprimé");

    return this.http.delete(this.url + "/" + assignment._id);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  };


}
