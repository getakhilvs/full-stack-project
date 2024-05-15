import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  receivedData:any;
  employeeId!:number;
  orders:any[]=[];
  chunkedOrders: any[][] = []; 
  displayedColumns1: string[] = ['transactionDebitId', 'merchName', 'transactionDateTime', 'merchCost'];

  constructor(private commonService:CommonService, private employeeService:EmployeeService) {}
  ngOnInit(): void {
    this.commonService.getData().subscribe(data => {
      this.receivedData = data;
      this.employeeId=this.receivedData.employeeId;
    });

    this.employeeService.getMyOrders(this.employeeId).subscribe(
      (response) => {
        this.orders=response;
        this.chunkOrders();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  }

  //logic for grouping 5 elements each in a row
  private chunkOrders() {
    const chunkSize = 4;
    for (let i = 0; i < this.orders.length; i += chunkSize) {
      this.chunkedOrders.push(this.orders.slice(i, i + chunkSize));
    }
  }
  
}
