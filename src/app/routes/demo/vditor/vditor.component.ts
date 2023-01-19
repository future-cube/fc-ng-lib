import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-demo-vditor',
  templateUrl: './vditor.component.html'
})
export class DemoVditorComponent implements OnInit {
  constructor(private http: _HttpClient) {}

  // @ViewChild('vditor', { static: true }) private readonly vditor!: VditorComponent;

  // options: VditorOptions = {
  //   toolbar: ['bold', 'italic', 'heading', '|', 'quote']
  // };

  ngOnInit(): void {
    console.log(123);
    // this.vditor.setOptions('lineNumbers', true);
  }
}
