// libraries
import {DateObject} from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// assets
import iranianBanks from "../../public/assets/data/iranian-banks.json";

export const formattedSize = (bytes: number): string => {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${Number((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

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

export const generateRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export const convertJalaliToGregorian = (date): string => new DateObject({
    date: date,
    format: "YYYY-MM-DD",
    calendar: persian,
    locale: persian_fa
}).convert(gregorian, gregorian_en).format("YYYY-MM-DD");

export const convertGregorianToJalali = (date): string => new DateObject({
    date: date,
    format: "YYYY-MM-DD",
    calendar: gregorian,
    locale: gregorian_en
}).convert(persian, persian_fa).format("YYYY-MM-DD");

export const generateTimeWithSecond = (time) => {
    const [hour, minute] = time.split(":");
    return new DateObject(time).setHour(Number(hour)).setMinute(Number(minute));
}

export const generateTimeWithoutSecond = (time) => new DateObject(time).setSecond(0).format("HH:mm:ss");

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

export const getValueByKey = (array, key: string, subKey?: string) => {
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

export const getAllIndexes = (array, value) => {
    const indexes = [];
    let i;

    for (i = 0; i < array.length; i++)
        if (array[i] === value) indexes.push(i);

    return indexes;
}

export const removeElementsByIndices = (array, arrayToRemove) => {
    const newArray = [...array];

    arrayToRemove.sort((a, b) => b - a);

    const removedElements = [];
    arrayToRemove.forEach((index) => {
        removedElements.push(newArray.splice(index, 1)[0]);
    });

    return newArray;
}


export const getBankInfoFromCardNumber = (cardNumber: string): { color: string, bank: string, title: string , bin: string } | null => cardNumber.length > 6 ? iranianBanks?.find(bank => cardNumber.startsWith(bank.bin)) : null;

export const formattedBankCardNumber = (cardNumber: string): string => cardNumber.match(/.{1,4}/g).join('-');


export const addArticleForContract = (articles, sections, notes, content: string) => {
    const updatedArticles = articles.map(article => ({...article}));
    const updatedSections = sections.map(section => ({...section}));
    const updatedNotes = notes.map(note => ({...note}));

    const lastArticle = updatedArticles.slice(-1)[0];
    const lastArticleSections = updatedSections.filter(section => section.last_article === "1");
    const lastArticleNotes = updatedNotes.filter(note => note.article_number === lastArticle.number && lastArticleSections.map(section => section.number).includes(note.section_number));

    updatedArticles.pop();

    updatedArticles.push({
        number: lastArticle.number,
        content: content,
        is_added: "1"
    });

    lastArticleSections.forEach(section => {
        section.article_number++;
    });

    lastArticleNotes.forEach(note => {
        note.article_number++;
    })

    lastArticle.number++;

    updatedArticles.push(lastArticle);

    return {articles: updatedArticles, sections: updatedSections, notes: updatedNotes};
}

export const removeArticleForContract = (articles, sections, notes, articleNumberToRemove: number) => {
    const updatedArticles = articles.map(article => ({...article}));
    let updatedSections = sections.map(section => ({...section}));
    let updatedNotes = notes.map(note => ({...note}));

    updatedNotes = updatedNotes.filter(note => note.article_number !== articleNumberToRemove);

    const selectedArticleIndex = updatedArticles.findIndex(article => article.number === articleNumberToRemove);
    updatedArticles.splice(selectedArticleIndex, 1);

    updatedArticles.forEach((article) => {
        if (article.number > articleNumberToRemove) {
            updatedNotes.forEach(note => {
                if (note.article_number === article.number) {
                    note.article_number--;
                }
            })

            article.number--;
        }
    });

    const sectionIndexesForDelete = getAllIndexes(updatedSections.map(item => item.article_number), articleNumberToRemove);

    updatedNotes = updatedNotes.map((item, index) => ({
        ...item,
        number: index + 1
    }));

    updatedSections = removeElementsByIndices(updatedSections, sectionIndexesForDelete);

    updatedSections.forEach((section) => {
        if (section.article_number > articleNumberToRemove) {
            section.article_number--;
        }
    });

    return {articles: updatedArticles, sections: updatedSections, notes: updatedNotes};
}

export const addSectionForContract = (sections, content: string, articleNumber: number, lastArticleSectionNumber: number) => {
    const updatedSections = sections.map(section => ({...section}));

    const articleSections = updatedSections.filter(section => section.article_number === articleNumber);

    updatedSections.push({
        number: articleSections.length + 1,
        article_number: articleNumber,
        content: content,
        isAdded: true,
        isOff: false,
        isStatic: false,
        last_article: articleNumber === lastArticleSectionNumber ? "1" : "0"
    });

    return updatedSections;
}

export const removeSectionForContract = (sections, notes, articleNumber: number, sectionNumberToRemove: number) => {
    let updatedSections = sections.map(section => ({...section}));
    let updatedNotes = notes.map(note => ({...note}));

    updatedSections = updatedSections.filter(section => !(section.article_number === articleNumber && section.number === sectionNumberToRemove));
    updatedNotes = updatedNotes.filter(note => !(note.article_number === articleNumber && note.section_number === sectionNumberToRemove));

    updatedSections.forEach(section => {
        if (section.article_number === articleNumber && section.number > sectionNumberToRemove) {
            section.number -= 1;
        }
    });

    updatedNotes.forEach(note => {
        if (note.article_number === articleNumber && note.section_number > sectionNumberToRemove) {
            note.section_number -= 1;
        }
    });

    updatedNotes = updatedNotes.map((note, index) => ({
        ...note,
        number: index + 1
    }));

    // // Remove the section
    // const updatedSections = sections.filter(section => section.number !== sectionNumberToRemove);
    //
    // // Remove notes associated with the removed section and update the section numbers
    // let updatedNotes = notes
    //     .filter(note => note.section_number !== sectionNumberToRemove)  // Remove notes of the removed section
    //     .map(note => ({
    //         ...note,
    //         section_number: note.section_number > sectionNumberToRemove
    //             ? note.section_number - 1
    //             : note.section_number
    //     }));
    //
    // // Renumber sections based on their article_number
    // const sectionCounters = {};
    // updatedSections.forEach(section => {
    //     if (!sectionCounters[section.article_number]) {
    //         sectionCounters[section.article_number] = 1;
    //     } else {
    //         sectionCounters[section.article_number] += 1;
    //     }
    //     section.number = sectionCounters[section.article_number];
    // });
    //
    // // Renumber notes sequentially
    // updatedNotes = updatedNotes.map((note, index) => ({
    //     ...note,
    //     number: index + 1
    // }));

    return {sections: updatedSections, notes: updatedNotes};
}

export const toggleSectionForContract = (sections, notes, articleNumber: number, sectionNumberToToggle: number) => {
    const updatedSections = sections.map(section => ({...section}));
    let updatedNotes = notes.map(note => ({...note}));

    const targetSection = updatedSections.find(section => section.article_number === articleNumber && section.number === sectionNumberToToggle);
    if (targetSection) {
        targetSection.isOff = !targetSection.isOff;
    }

    const articleSections = updatedSections.filter(section => section.article_number === articleNumber);
    let count = 0;
    articleSections.forEach(section => {
        if (section.isOff) {
            section.number = 0;
        } else {
            count++;
            section.number = count;
        }
    });

    // when turn on -> turn off
    if (targetSection.isOff) {
        updatedNotes = updatedNotes.filter(note => !(note.article_number === articleNumber && note.section_number === sectionNumberToToggle));

        updatedNotes.forEach(note => {
            if (note.article_number === articleNumber && note.section_number > sectionNumberToToggle) {
                note.section_number -= 1;
            }
        });
    } else {
        updatedNotes.forEach(note => {
            if (note.article_number === articleNumber && note.section_number > sectionNumberToToggle) {
                note.section_number += 1;
            }
        });
    }

    updatedNotes.forEach((note, index) => {
        note.number = index + 1;
    });

    return {
        sections: updatedSections,
        notes: updatedNotes
    };
}

export const addNoteForContract = (notes, content: string, articleNumber: number, sectionNumber: number) => {
    let updatedNotes = notes.map(note => ({...note}));

    updatedNotes.push({
        number: updatedNotes.length + 1,
        article_number: articleNumber,
        section_number: sectionNumber,
        content: content,
        isAdded: true
    });

    updatedNotes = updatedNotes.sort((a, b) => {
        if (a.article_number !== b.article_number) {
            return a.article_number - b.article_number;
        } else {
            return a.section_number - b.section_number;
        }
    });

    for (let i = 0; i < updatedNotes.length; i++) {
        updatedNotes[i].number = i + 1;
    }

    return updatedNotes;
}

export const removeNoteForContract = (notes, noteNumberToRemove: number) => {
    let updatedNotes = notes.filter(item => item.number !== noteNumberToRemove);

    updatedNotes = updatedNotes.map((item, index) => ({
        ...item,
        number: index + 1
    }));

    return updatedNotes;
}


export const addArticleForInsertion = (articles, content: string) => {
    const updatedArticles = articles.map(article => ({...article}));

    updatedArticles.push({
        number: updatedArticles.length + 1,
        content: content,
        is_added: "1"
    });

    return updatedArticles;
}

export const removeArticleForInsertion = (articles, sections, articleNumberToRemove: number) => {
    const updatedArticles = articles.map(article => ({...article}));
    let updatedSections = sections.map(section => ({...section}));

    const selectedArticleIndex = updatedArticles.findIndex(article => article.number === articleNumberToRemove);
    updatedArticles.splice(selectedArticleIndex, 1);

    updatedArticles.forEach((article) => {
        if (article.number > articleNumberToRemove) {
            article.number--;
        }
    });

    const sectionIndexesForDelete = getAllIndexes(updatedSections.map(item => item.article_number), articleNumberToRemove);

    updatedSections = removeElementsByIndices(updatedSections, sectionIndexesForDelete);

    updatedSections.forEach((section) => {
        if (section.article_number > articleNumberToRemove) {
            section.article_number--;
        }
    });

    return {articles: updatedArticles, sections: updatedSections};
}

export const addSectionForInsertion = (sections, content: string, articleNumber: number) => {
    const updatedSections = sections.map(section => ({...section}));

    const articleSections = updatedSections.filter(section => section.article_number === articleNumber);

    updatedSections.push({
        number: articleSections.length + 1,
        article_number: articleNumber,
        content: content,
        isAdded: true,
        isStatic: false,
    })

    return updatedSections;
}

export const removeSectionForInsertion = (sections, articleNumber: number, sectionNumberToRemove: number) => {
    let updatedSections = sections.map(section => ({...section}));

    updatedSections = updatedSections.filter(section => !(section.article_number === articleNumber && section.number === sectionNumberToRemove));

    updatedSections.forEach(section => {
        if (section.article_number === articleNumber && section.number > sectionNumberToRemove) {
            section.number -= 1;
        }
    });

    return updatedSections;
}
