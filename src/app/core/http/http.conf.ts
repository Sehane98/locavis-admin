import { environment } from '../../../environments/environment';

export class HttpConf {
  public static culture = 'az'
  public static REST_API = environment.root;
  public static CONFIRMATION = `${HttpConf.REST_API}/admin/${HttpConf.culture}/Confirmation`;
  

  public static URL = {
    auth: `${HttpConf.REST_API}/auth/az/Account/Login`,
    // auth: `${HttpConf.REST_API}:7092/api/authenticate`,
    // "az/Confirmation/GetProfiles"

    profiles: `${HttpConf.CONFIRMATION}/GetProfiles`,
    profile: `${HttpConf.CONFIRMATION}/GetProfile`,


    login_customer: `${HttpConf.REST_API}/login-customer`,
    registration: `${HttpConf.REST_API}/register`,
    users: `${HttpConf.REST_API}/users`,
    customers: `${HttpConf.REST_API}/customers`,
    tasks: `${HttpConf.REST_API}/tasks`,
    test: `${HttpConf.REST_API}/register`,

  };

}
