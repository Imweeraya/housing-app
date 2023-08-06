import { Component , inject } from '@angular/core'; //import เป็น js
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location'; //import ทั้งใน home และ housting คือทั้งแม่และลูก
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule , HousingLocationComponent], //angular
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter  (input)="filterResults(filter.value)"/> 
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
      *ngFor="let item of filteredLocationList" 
         [housingLocation]="item"
      ></app-housing-location>
    </section>

  `, //#filter คือชื่อที่เรากำหนดให้กับ input
  //(input)="filterResults(filter.value) search ตั้งแต่ใส่ยังไม่กดปุ่มก็ search
  //[housingLocation]  property binding ชื่อเดียวกับ @Input() housingLocation!: HousingLocation; เอามา ng for เพื่อ loop ข้อมูล
  //*ngFor="let housingLocation of filteredLocationList" เอาแค่ตามที่เสิร์ชหา
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  filteredLocationList: HousingLocation[] = [];


//[housingLocation]="housingLocation"    "housingLocation" ชื่อเดียวกับ housingLocation: 
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);


  // constructor() {
  //   this.housingLocationList = this.housingService.getAllHousingLocations();
  //   this.filteredLocationList = this.housingLocationList;
  // }

  constructor() {
    this.housingService.getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
  

  filterResults(text: string) {
    if (!text) { //ถ้าuserไม่ได้ใส่อะไรเข้ามา (falsy)
      this.filteredLocationList = this.housingLocationList;
    }


    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase()) //ดูจากชื่อเมืองเป็นหลัก
    );
  }


  


}
