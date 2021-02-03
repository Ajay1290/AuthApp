const LOGIN_LINK  = (email, password) => `http://3.14.73.31/login?email=${email}&password=${password}`;
const REGISTER_LINK = (name, email, phone, password) => `http://3.14.73.31/register?username=${name}&email=${email}&password=${password}&phone=${phone}`;

const USER_LINK = (user_id) => `http://3.14.73.31/user/${user_id}`;
const GENERATE_OTP_LINK = (email) => `http://3.14.73.31/genrate-otp?email=${email}`;
const VERIFY_OTP_LINK = (email, otp) => `http://3.14.73.31/verify-otp?email=${email}&otp=${otp}`;

   
const JsonApiFetcher = async (link, method='GET') => {
    try {
        const response = await fetch(link, {cache: "no-cache", 
                                            method: method, 
                                            headers: { 'Content-Type': 'application/json'},
                                        });
        return await response.json()
      } catch (error) {
            console.log(error);
      }
}
    
    
export const LoginService = (email, password) => {
    return JsonApiFetcher(LOGIN_LINK(email, password), 'POST')
}

export const UserService = (user_id) => {
    return JsonApiFetcher(USER_LINK(user_id))
}

export const RegisitrationService = (name, email, phone, password) => {
    return JsonApiFetcher(REGISTER_LINK(name, email, phone, password), 'POST')
}

export const GenrateOTPService = (email) => {
    return JsonApiFetcher(GENERATE_OTP_LINK(email))
}

export const VerifyOTPService = (email, otp) => {
    return JsonApiFetcher(VERIFY_OTP_LINK(email, otp), 'POST')
}
