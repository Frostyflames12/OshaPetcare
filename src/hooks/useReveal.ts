import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = (el: Element) => {
      if (el.classList.contains('reveal') && !el.classList.contains('visible')) {
        intersectionObserver.observe(el);
      }
    };


    document.querySelectorAll('.reveal').forEach(observe);

   
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== Node.ELEMENT_NODE) return;
          const el = node as Element;
          if (el.classList.contains('reveal')) observe(el);
          el.querySelectorAll?.('.reveal').forEach(observe);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
}