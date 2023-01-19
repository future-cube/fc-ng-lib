import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-doc-view',
  templateUrl: './view.component.html'
})
export class DocViewComponent implements OnInit {
  id?: string;
  doc?: any;
  constructor(private http: _HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe((res: any) => {
      this.id = res.id;
      this.load();
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
  load() {
    this.http.get('system/doc/view', { id: this.id }).subscribe((res: any) => {
      this.doc = res;
    });
  }
}
