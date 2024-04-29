export const formattedSize = (bytes) => {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const toEnglishDigits = (data) => {
    let e = '۰'.charCodeAt(0);

    data = data.replace(/[۰-۹]/g, function (t) {
        return t.charCodeAt(0) - e;
    });

    e = '٠'.charCodeAt(0);

    data = data.replace(/[٠-٩]/g, function (t) {
        return t.charCodeAt(0) - e;
    });

    return data;
}

export const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export const encodeData = (data) => btoa(data).concat(process.env.HASH_KEY).replace("==", " ");

export const decodeData = (data) => atob(data.replace(process.env.HASH_KEY, ""));