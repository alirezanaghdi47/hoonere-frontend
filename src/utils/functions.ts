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

export const hexToRgba = (hex, alpha = 1) => {
    let color;

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        color = hex.substring(1).split('');

        if (color.length == 3) {
            color = [color[0], color[0], color[1], color[1], color[2], color[2]];
        }

        color = '0x' + color.join('');

        return `rgba(${[(color >> 16) & 255, (color >> 8) & 255, color & 255].join(',')},${alpha})`;
    }
}

export const generateRandomNumber = (min ,max) => Math.floor(Math.random() * (max - min + 1) + min);

export const encodeData = (data) => btoa(btoa(data).concat(generateRandomString(372))).replace("==", " ");

export const decodeData = (data) => {
    let bytes = Uint8Array.from(atob(data).split("").map(char => char.charCodeAt(0)));
    const decoder = new TextDecoder("utf-8");
    let decodedString = decoder.decode(bytes);
    decodedString = decodedString.substring(0, decodedString.length - 372);

    bytes = Uint8Array.from(atob(decodedString).split("").map(char => char.charCodeAt(0)));
    let secondDecodedString = decoder.decode(bytes);

    return secondDecodedString;
}
