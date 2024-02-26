
import { Component, OnInit } from '@angular/core';
import { CustData } from '../_services/form-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  
  customer:any;

  constructor(private cd: CustData) {}

  ngOnInit(): void {
   
   this.cd.getData().subscribe((data)=>{
    this.customer=data;
    console.log(data)
   })
  }

  
}
