import { Component, OnInit } from '@angular/core';
import { ChecklistService } from '../checklist.service';

interface ChecklistItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  items: ChecklistItem[] = [];
  newTask = '';

  constructor(private checklistService: ChecklistService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.checklistService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  addItem(): void {
    const newItem: Partial<ChecklistItem> = { task: this.newTask, completed: false };
    this.checklistService.addItem(newItem as ChecklistItem).subscribe(item => {
      this.items.push(item);
      this.newTask = '';
    });
  }

  toggleCompletion(item: ChecklistItem): void {
    item.completed = !item.completed;
    this.checklistService.updateItem(item).subscribe();
  }

  deleteItem(id: number): void {
    this.checklistService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item.id !== id);
    });
  }
}