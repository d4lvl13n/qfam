/**
 * Décode les entités HTML (ex: &amp; → &, &lt; → <, etc.)
 * @param html - Chaîne contenant des entités HTML encodées
 * @returns Chaîne avec les entités HTML décodées
 */
export const decodeHtmlEntities = (html: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = html;
  return textarea.value;
};

/**
 * Alternative utilisant une approche plus simple si document n'est pas disponible
 * (pour SSR ou tests)
 */
export const decodeHtmlEntitiesSimple = (html: string): string => {
  const entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  };

  return html.replace(/&[#\w]+;/g, (entity) => {
    return entityMap[entity] || entity;
  });
};

/**
 * Fonction principale qui utilise la méthode la plus appropriée
 */
export const decodeHtml = (html: string): string => {
  if (typeof document !== 'undefined') {
    return decodeHtmlEntities(html);
  }
  return decodeHtmlEntitiesSimple(html);
};

export default decodeHtml;

