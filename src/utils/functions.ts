export const toEnglishDigits = (data: string): string => {
    let e = '۰'.charCodeAt(0);

    data = data.replace(/[۰-۹]/g, function (t: string): string {
        return (t.charCodeAt(0) - e).toString();
    });

    e = '٠'.charCodeAt(0);

    data = data.replace(/[٠-٩]/g, function (t: string): string {
        return (t.charCodeAt(0) - e).toString();
    });

    return data;
}

export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export const generateRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export const hexToRgba = (hex: string, alpha: number = 1): string => {
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

export const encodeData = (data): string => {
    let encoded = btoa(encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode(Number(('0x' + p1)))
    })) + generateRandomString(372);

    encoded = btoa(encodeURIComponent(encoded).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
        return String.fromCharCode(Number(('0x' + p1)))
    }));

    return encoded;
}

export const decodeData = (data): string => {
    let bytes = Uint8Array.from(atob(data).split("").map(char => char.charCodeAt(0)));
    const decoder = new TextDecoder("utf-8");
    let decodedString = decoder.decode(bytes);
    decodedString = decodedString.substring(0, decodedString.length - 372);

    bytes = Uint8Array.from(atob(decodedString).split("").map(char => char.charCodeAt(0)));

    return decoder.decode(bytes);
}

export const cloneObject = (object: object): object => JSON.parse(JSON.stringify(object));

export const cleanObject = (sourceObject: object) => {
    const clonedObject = cloneObject(sourceObject);

    for (const propName in clonedObject) {
        if (clonedObject[propName] === null || clonedObject[propName] === undefined || clonedObject[propName] === "" || clonedObject[propName]?.length === 0) {
            delete clonedObject[propName];
        }
    }

    return clonedObject;
}

export const getObjectValueByKey = (array, key: string, subKey?: string) => {
    for (const item of array) {
        if (item.hasOwnProperty(key)) {
            if (subKey && Array.isArray(item[key])) {
                if (item[key].length > 0 && item[key][0].hasOwnProperty(subKey)) {
                    return item[key][0][subKey];
                }
            } else {
                return item[key];
            }
        }
    }

    return null;
}