import { environment } from '../../../environments/environment';

export class HttpConf {
  public static culture = 'az'
  public static REST_API = environment.root;
  public static ADMIN = `${HttpConf.REST_API}/admin/${HttpConf.culture}`;
  public static API = `${HttpConf.REST_API}/api/${HttpConf.culture}`;

  public static CONFIRMATION = `${HttpConf.ADMIN}/Confirmation`;
  public static COLLECTION = `${HttpConf.API}/Collection`;
  public static USER = `${HttpConf.ADMIN}/User`;
  

  public static URL = {
    auth: `${HttpConf.REST_API}/auth/az/Account/Login`,

    getProfiles: `${HttpConf.CONFIRMATION}/GetProfiles`,
    getProfile: `${HttpConf.CONFIRMATION}/GetProfile`,
    editProfile: `${HttpConf.CONFIRMATION}/EditProfile`,

    getUsers: `${HttpConf.USER}/Getlist`,
    lockUser: `${HttpConf.USER}/Lock`,
    unlockUser: `${HttpConf.USER}/Unlock`,
    suspend: `${HttpConf.USER}/Suspend`,

    getCars: `${HttpConf.CONFIRMATION}/GetCars`,
    getCar: `${HttpConf.CONFIRMATION}/GetCar`,
    editCar: `${HttpConf.CONFIRMATION}/EditCar`,
    getColorList: `${HttpConf.COLLECTION}/GetColorList`,


    
    login_customer: `${HttpConf.REST_API}/login-customer`,
    registration: `${HttpConf.REST_API}/register`,
    users: `${HttpConf.REST_API}/users`,
    customers: `${HttpConf.REST_API}/customers`,
    tasks: `${HttpConf.REST_API}/tasks`,
    test: `${HttpConf.REST_API}/register`,

  };

}
