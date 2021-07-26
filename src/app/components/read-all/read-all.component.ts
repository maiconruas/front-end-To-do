import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

import { Router } from '@angular/router';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

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

  finalizar(item: Todo): void{
    item.finalizado = true;
    this.service.update(item).subscribe(()=>{
      this.service.message('Tarefa finalizada com sucesso!');
        this.list = this.list.filter(todo => todo.id !== item.id);
        this.closed++;
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

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados'])
  }
}
