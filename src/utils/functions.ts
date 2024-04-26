export const formattedSize = (bytes) => {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export const toEnglishDigits = (string) => {
    let e = '۰'.charCodeAt(0);

    string = string.replace(/[۰-۹]/g, function(t) {
        return t.charCodeAt(0) - e;
    });

    e = '٠'.charCodeAt(0);

    string = string.replace(/[٠-٩]/g, function(t) {
        return t.charCodeAt(0) - e;
    });

    return string;
}
