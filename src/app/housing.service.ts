import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  readonly url = "http://localhost:3000/locations"; //readonly set ใฟ้อ่านได้อย่างเดียว ป้องกันการแก้ไข
  
  //[housingLocation]="housingLocation"    "housingLocation" ชื่อเดียวกับ housingLocation: 
  
  constructor() { }

  // getAllHousingLocations(): HousingLocation[] {
  //   return this.housingLocationList;
  // }

  async getAllHousingLocations(): Promise<HousingLocation[]> { //ได้ออกมาเป็นบัตรคิว
    const data = await fetch(this.url); // await ต้องมี async ครอบอยู่  
    return (await data.json()) ?? []; //return ออกเป็น json
  }
  

  // getHousingLocationById(id: number): HousingLocation | undefined {
  //   return this.housingLocationList.find( //method find in array
  //     (housingLocation) => housingLocation.id === id
  //   );
  // }

  async getHousingLocationById(id: number): 
        Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }



  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, 
                 lastName: ${lastName}, email: ${email}.`);
  }
  
  
}
