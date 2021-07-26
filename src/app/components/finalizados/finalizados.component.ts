import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {
  closed = 0;

  //instancia lista de TO-DO
  list: Todo[] = [];
  listFinish: Todo[] = [];

  constructor( private service: TodoService,
               private router: Router ) { }

  ngOnInit(): void {
    this.findAll();
  }

  
  findAll(): void {
    this.service.findAll().subscribe((resposta)=>{
      resposta.forEach(todo => {
        if(todo.finalizado){
          this.listFinish.push(todo);
        }else{
          this.list.push(todo);
        }
      });
      this.closed = this.listFinish.length
    });
  }


  delete(id: any):void {
    this.service.delete(id).subscribe((resposta)=>{
      if(resposta === null) {
        this.service.message('Tarefa deletada com sucesso!');
        this.list = this.list.filter(todo => todo.id !== id);
      }
    });
  }

  

  voltar(): void {
    this.router.navigate([''])
  }
}
