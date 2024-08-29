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

    updatedSections = removeElementsByIndexes(updatedSections, sectionIndexesForDelete);

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