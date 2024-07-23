export class Cinema {
    id: string;
    name: string;
    location: Address;
    screens: number;
  
    constructor(
      id: string,
      name: string,
      location: Address=new Address(),
      screens: number
    ) {
      this.id = id;
      this.name = name;
      this.location = location;
      this.screens = screens;
    }
  }

  export class Address{
    street: string;
    city: string;
    state: string;
    pincode: string;
  
    constructor(
      street: string='',
      city: string='',
      state: string='',
      pincode: string=''
    ) {
      this.street = street;
      this.city = city;
      this.state = state;
      this.pincode = pincode;
    }
  }
  