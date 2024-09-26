import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ChecklistItem {
  id: number;
  task: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  private apiUrl = 'http://localhost:8000/api/items/';

  constructor(private http: HttpClient) {}

  getItems(): Observable<ChecklistItem[]> {
    return this.http.get<ChecklistItem[]>(this.apiUrl);
  }

  addItem(item: ChecklistItem): Observable<ChecklistItem> {
    return this.http.post<ChecklistItem>(this.apiUrl, item);
  }

  updateItem(item: ChecklistItem): Observable<ChecklistItem> {
    return this.http.put<ChecklistItem>(`${this.apiUrl}${item.id}/`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
