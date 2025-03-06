// Tableau pour stocker les éléments créés
export const createdElements = [];

/**
 * Crée un nouvel élément, l'ajoute au parent spécifié, et le stocke dans un tableau.
 * @param {string} type - Le type de l'élément à créer (ex: 'div', 'span', etc.).
 * @param {string} id - L'ID de l'élément.
 * @param {string} className - La classe de l'élément.
 * @param {HTMLElement} parent - Le parent auquel ajouter l'élément.
 * @param {string | null} content - Le text de l'élément.
 * @param {value | null } data - data à stocker dans l'élément.
 * @returns {HTMLElement} - L'élément créé.
 */
export function AddElement(type, id, className, parent, content = null, data = null) {
    // Vérifie si l'élément parent existe
    if (parent == null) return false;

    // Crée un nouvel élément
    const newElement = document.createElement(type);
    if (id) newElement.id = id;
    if (className) newElement.className = className;
    if (content) newElement.textContent = content;
    if (data != null) newElement.dataset.value = data;

    // Ajoute l'élément au parent spécifié
    parent.appendChild(newElement);

    // Stocke l'élément dans le tableau
    createdElements.push(newElement);

    return newElement;
}

/**
 * Supprime tous les éléments stockés dans le tableau du DOM et vide le tableau.
 * @returns {HTMLElement[]} - Le tableau vide des éléments.
 */
export function clearElements() {
    // Parcourt tous les éléments stockés et les supprime du DOM
    createdElements.forEach(element => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });

    // Vide le tableau
    createdElements.length = 0;

    return createdElements;
}

