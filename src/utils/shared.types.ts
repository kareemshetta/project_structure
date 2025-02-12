export interface Iuser {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: string;
  email?: string;
  password?: string;
  status?: string;
  otp?: string;
  otpCreatedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  cartId?: string;
}

export interface MulterRequest extends Request {
  file: any;
  files: any[];
}

export interface ICity {
  name?: string;
  nameAr?: string;
  createdAt?: string;
  updatedAt?: string;
  regions?: IRegion[];
  id?: string;
}

export interface IRegion {
  name?: string;
  nameAr?: string;
  cityId?: string;
  city?: ICity;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export interface Iuser {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: string;
  email?: string;
  password?: string;
  status?: string;
  otp?: string;
  otpCreatedAt?: string;
  createdAt?: string;
  updatedAt?: string;

  cartId?: string;
}

export interface IAdmin extends Iuser {
  storeId?: string;
}
