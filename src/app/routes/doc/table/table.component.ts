import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-doc-table',
  templateUrl: './table.component.html',
})
export class DocTableComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit(): void { }

}
