import { useId } from 'react';

/**
 * `useId` de React devuelve identificadores con dos puntos (`:r3:`). Son
 * válidos en HTML y funcionan con `aria-controls`, pero rompen cualquier
 * `querySelector('#…')` y los selectores CSS. Aquí se limpian para que los
 * ids del sitio sean utilizables desde CSS y desde scripts de prueba.
 */
export function useDomId(prefix = 'id') {
  return `${prefix}-${useId().replace(/:/g, '')}`;
}

export default useDomId;
