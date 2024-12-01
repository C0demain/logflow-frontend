import Cookies from 'js-cookie'

export default function hasGoogleAccount(){
    return Cookies.get('has-google-account') === 'true'
}