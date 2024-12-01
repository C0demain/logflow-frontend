import Cookies from 'js-cookie'

export default function hasGoogleAccount(){
    return Boolean(Cookies.get('has-google-account'))
}