export interface signup {
    name: string
  email: string
  password: string
  rePassword: string
  phone: string
}

export interface ResponseSuccess {
  message: string;
  user: {
      name: string;
      email: string;
      role: string;
  };
  token: string;
}

 export interface responseFailed{
  statusMsg:string,
  message:string,
 }
 export interface login{
  email:string,
  password:string
 }

 export interface InvalidEmail{
  message: string,
  errors: {
      value: string,
      msg: string,
      param: string,
      location: string
  }
}