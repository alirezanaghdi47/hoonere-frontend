const getAllIndexes = (array, value) => {
    const indexes = [];

    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            indexes.push(i);
        }
    }

    return indexes;
}

const removeElementsByIndexes = (array, arrayToRemove) => {
    const newArray = [...array];

    arrayToRemove.sort((a, b) => b - a);

    const removedElements = [];
    arrayToRemove.forEach((index) => {
        removedElements.push(newArray.splice(index, 1)[0]);
    });

    return newArray;
}

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

    updatedSections = removeElementsByIndexes(updatedSections, sectionIndexesForDelete);

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