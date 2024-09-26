import Cookies from "js-cookie";


class ValidationHelper{

    static isLogin() {
        return !!Cookies.get('token');
    }

    static IsUndefined(value) {
        return typeof value === 'undefined';
    }

    static isString(value) {
        return typeof value === 'string';
    }

    // static isNumber(value) {
    //     return typeof value === 'number';
    // }
    static isNumber(value) {
        let  OnlyNumberRegx = /^\d+(\.\d+)?$/;
        return OnlyNumberRegx.test(value);
    }
    static isMobile(value) {
        let  MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
        return MobileRegx.test(value);
    }
    static isPassword(value) {
        let PasswordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return PasswordRegx.test(value);
    }

    static isNullOrUndefined(value) {
        return value === null || typeof value === 'undefined';
    }

    static IsNull(value) {
        return value == null;
    }

    static isArray(value) {
        return Array.isArray(value);
    }

    static isEmptyArray(value) {
        return Array.isArray(value) && value.length === 0;
    }

    static isEmpty(value) {
        return value === null || value === undefined || value.length === 0;
    }

    static isEmail(value) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(value);
    }

    static IsDate(value) {
        const DATERegex = /^\d{4}-\d{2}-\d{2}$/;
        return DATERegex.test(value);
    }

    static isDate(value) {
        const date = new Date(value);
        return !isNaN(date.getTime());
    }


    static isTodayDate(value) {
        const inputDate = new Date(value);
        const currentDate = new Date();
        if (isNaN(inputDate.getTime())) {
            return false;
        }
        if (inputDate.toDateString() === currentDate.toDateString()) {
            return true;
        } else {
            return false;
        }
    }


    static isURL(value) {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(value);
    }

    static isIPAddress(value) {
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Regex = /^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/i;
        return ipv4Regex.test(value) || ipv6Regex.test(value);
    }

    static isValidFileExtension(filename, extensions) {
        const extension = filename.split('.').pop().toLowerCase();
        return extensions.includes(extension);
    }

    static isPasswordConfirmed(password, confirmPassword) {
        return password === confirmPassword;
    }

    static isValidJSON(jsonString) {
        try {
            JSON.parse(jsonString);
            return true;
        } catch (error) {
            return false;
        }
    }

    static isObject(value) {
        return typeof value === 'object' && value !== null;
    }

    static isEmptyObject(obj) {
        // Check if the argument is an object and not null
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        // Check if the object has no own enumerable properties
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false; // If the object has any own properties, it's not empty
            }
        }
        return true; // If the loop completes without finding any own properties, the object is empty
    }

}
export default ValidationHelper