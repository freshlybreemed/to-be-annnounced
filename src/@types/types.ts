export interface EventProps {
  _id: string;
  name: string;
  image: string;
  location: {
    venue: string;
    city: string;
    state: string;
    zip: string;
    address: string;
    placeId: string;
    lat: number;
    lng: number;
    timeZoneId: string;
  };
  description: string;
  startDate: Date;
  organizerId: string;
  tickets: OrderProps[];
  endDate: Date;
  slug: string;
  password: string;
  refunds: boolean;
  pageViews: number;
  gross: number;
  listed: boolean;
  eventType: string;
  lineUp: {
    [igHandle: string]: LineUpProps;
  };
  ticketTypes: {
    [ticketName: string]: TicketProps;
  };
  updatedAt: string;
  publishDate: string;
  public: boolean;
}

export interface TicketProps {
  ticketName: string;
  quantity: number;
  price: number;
  sold: number;
  _id: number;
  description: string;
  donation: boolean;
  free: boolean;
  ticketEndDate: Date;
  enabled: boolean;
  fee: number;
}

export interface LineUpProps {
  _id: number;
  igHandle: string;
  imageURL: string;
  artistName: string;
}

export interface UserTicketProps {
  ticketName: string;
  price: number;
  description: string;
  donation: boolean;
  free: boolean;
  barCode: string;
  fee: number;
  orderId: string;
  eventId: string;
  checkedIn: boolean;
  checkInDate: Date;
}

export interface OrderProps {
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  eventId: string;
  orderDate: Date;
  total: number;
  cart: {
    [ticketName: string]: EventCartProps;
  };
  checkedIn: boolean;
  tickets: UserTicketProps[];
  cancelled: boolean;
  refunded: boolean;
  token: any;
  status: string;
  _id: string;
}

export interface EventCartProps {
  price: number;
  quantity: number;
  fee: number;
  _id: string;
  ticketName: string;
}

export interface UserProps {
  _id: string;
  updatedAt: Date;
  firebase: any;
  payouts: any;
  settings: any;
}
