# CR Vinos - Sistema de Transiciones entre Páginas

Este documento explica el sistema de transiciones animadas entre páginas implementado en CR Vinos.

## Componentes Principales

### 1. TransitionProvider

El `TransitionProvider` es un componente que debe envolver toda la aplicación (está en el layout.tsx). Este componente:

- Proporciona el contexto de transición a toda la aplicación
- Renderiza el componente de animación cuando es necesario
- Maneja la navegación automática al destino

### 2. TransitionScreen

El componente `TransitionScreen` es responsable de mostrar la animación durante las transiciones. Características:

- Muestra el logo de CR Vinos con una animación suave
- Se activa cuando `isVisible` es `true`
- Llama a `onAnimationComplete` cuando termina la animación de salida

### 3. TransitionLink

El componente `TransitionLink` es un reemplazo directo para el componente `Link` de Next.js. Usa el sistema de transiciones para:

- Mostrar la animación antes de navegar a una nueva página
- Permitir navegación normal para enlaces externos, anclas o cuando se presionan teclas modificadoras

## Cómo Usar

### Enlaces Básicos

Reemplaza los enlaces normales con `TransitionLink`:

```jsx
import TransitionLink from '@/components/TransitionLink';

// Antes
<Link href="/about">Nosotros</Link>

// Después
<TransitionLink href="/about">Nosotros</TransitionLink>
```

### Navegación Programática

Si necesitas navegar programáticamente (por ejemplo, después de un envío de formulario):

```jsx
import { useTransition } from '@/components/TransitionLink';

function MiComponente() {
  const { startTransition } = useTransition();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Lógica del formulario...
    
    // Navegar con animación
    startTransition('/gracias');
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Contenido del formulario */}
    </form>
  );
}
```

## Cómo Funciona

1. Al hacer clic en un `TransitionLink`, se llama a `startTransition` con la URL de destino
2. El `TransitionProvider` establece `isVisible` a `true`, lo que muestra el `TransitionScreen`
3. Después de un tiempo (aproximadamente 1.5 segundos), se navega automáticamente a la URL de destino
4. La animación permanece visible mientras se carga la nueva página
5. Una vez que la nueva página está lista, la animación se desvanece

## Páginas de Ejemplo

- `/transition-example` - Muestra todas las características de transición
- `/navigation-example` - Compara enlaces estándar con enlaces de transición

## Notas Técnicas

- El tiempo de animación está fijado en 1.8 segundos
- La navegación ocurre después de 1.5 segundos para permitir que la animación se vea
- Existe un temporizador de seguridad de 5 segundos para evitar que la animación quede atascada
- La animación utiliza framer-motion para las transiciones suaves 