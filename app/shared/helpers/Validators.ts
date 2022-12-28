export default class Validators {
    static EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    static YOUTUBE_URL_REGEX = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    static PHONE_NUMBER_VN = /^(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$/;

    static isEmailValid(value: string): boolean {
        const reg = Validators.EMAIL_REGEX;
        return reg.test(value);
    }

    static isValidYoutubeUrl(input: string): boolean {
        const regex = Validators.YOUTUBE_URL_REGEX;
        return regex.test(input);
    }

    static isPhoneValid(value: string): boolean {
        const reg = Validators.PHONE_NUMBER_VN;
        return reg.test(value);
    }
}
