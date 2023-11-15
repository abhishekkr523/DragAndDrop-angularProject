import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Itask } from '../task.ts/task';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: Itask[] = [];
  inprogress: Itask[] = [];
  onhold: Itask[] = [];
  completed: Itask[] = [];

  draggedOverContainer: string | null = null;

  constructor(private fb: FormBuilder) {
    console.log(this.tasks)

  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }
  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false

    });
    this.todoForm.reset(); // Reset the form
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1)
  }
  deleteInprogressTask(i: number) {
    this.inprogress.splice(i, 1)
  }
  deleteOnholdTask(i: number) {
    this.onhold.splice(i, 1)
  }
  deleteCompletedTask(i: number) {
    this.completed.splice(i, 1)
  }
  editTask(i: number) {

  }
  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onDragStart(containerName: string) {
    this.draggedOverContainer = containerName;
  }

}
