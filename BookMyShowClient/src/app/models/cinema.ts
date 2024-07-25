export class Cinema {
    id: string;
    name: string;
    location: Address;
    city: string;
    screens: number;
  
    constructor(
      id: string,
      name: string,
      city: string,
      location: Address=new Address(),
      screens: number
    ) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.screens = screens;
      this.city = city;
    }
  }

  export class Address{
    house_no: string;
    street: string;
    area: string;
    pincode: string;
  
    constructor(
      house_no: string='',
      street: string='',
      area: string='',
      pincode: string=''
    ) {
      this.street = street;
      this.pincode = pincode;
      this.area = area;
      this.house_no = house_no;
    }
  }
  