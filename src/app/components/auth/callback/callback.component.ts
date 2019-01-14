import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService} from 'ngx-spinner'

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { 
  }

  ngOnInit() {
    this.spinner.show();
  }

}
