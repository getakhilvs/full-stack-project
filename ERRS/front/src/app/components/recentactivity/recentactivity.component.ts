import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-recentactivity',
  templateUrl: './recentactivity.component.html',
  styleUrls: ['./recentactivity.component.css']
})
export class RecentactivityComponent implements OnInit{
  creditList: any[] = [];
  orders:any[]=[];
  displayedColumns: string[] = ['employeeFirstName','numberofPoints', 'award', 'remarks', 'transactionDateTime'];
  displayedColumns1: string[] = ['transactionDebitId','employeeFirstName', 'merchName', 'transactionDateTime', 'merchCost'];
  constructor(private activityService:ActivityService) {}
  ngOnInit() {
    this.activityService.getCreditList().subscribe(
      (response) => {
        this.creditList=response;
        console.log(this.creditList);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.activityService.getDebitList().subscribe(
      (response) => {
        this.orders=response;
        
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
