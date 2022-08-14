export const containClass = (elmt, className) => {
    let elem;
    try {
        elem = typeof elmt === 'object' ? elmt : document.querySelector(elmt);   
    } catch (error) {
        console.error(error);
        return;
    }

    if (elem.classList.contains(className)) {
        return true;
    }

    return false;
}

export const addClass = (elmt, className) => {
    let elem;
    try {
        elem = typeof elmt === 'object' ? elmt : document.querySelector(elmt);   
    } catch (error) {
        console.error(error);
        return;
    }

    if (containClass(elem, className)) {
       return; 
    }

    elem.classList.add(className);
    return true;
}

export const removeClass = (elmt, className) => {
    let elem;
    try {
        elem = typeof elmt === 'object' ? elmt : document.querySelector(elmt);   
    } catch (error) {
        console.error(error);
        return;
    }

    if (containClass(elem, className)) {
        elem.classList.remove(className);
    }
    
    return true;
}

export const replaceClass = (elmt, classFrom, classTo) => {
    let elem;
    try {
        elem = typeof elmt === 'object' ? elmt : document.querySelector(elmt);   
    } catch (error) {
        console.error(error);
        return;
    }

    if (containClass(elem, classFrom)) {
        removeClass(elmt, classFrom);
        addClass(elmt, classTo);
    }

    return true;
}
