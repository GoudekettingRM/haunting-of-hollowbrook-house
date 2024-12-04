'use client';
import { parameterize } from '@goudekettingrm/parameterize';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PhysicsProvider } from './PhysicsProvider';
import { LetterEffectConfig } from './types';
import { useLetterEffect } from './useLetterEffect';

interface WithDisappearingLettersProps {
  children: React.ReactNode;
  config?: Partial<LetterEffectConfig>;
  className?: string;
}

export const WithDisappearingLetters = ({ children, config, className = '' }: WithDisappearingLettersProps) => {
  const { processElement, isEnabled } = useLetterEffect(config);
  const containerRef = useRef<HTMLDivElement>(null);
  const [processedElements, setProcessedElements] = useState<{ [key: string]: React.ReactNode }>({});
  const processElementRef = useRef(processElement);

  useEffect(() => {
    processElementRef.current = processElement;
  }, [processElement]);

  const getElementKey = (element: Element, text: string) => {
    return parameterize(`${element.tagName.toLowerCase()}-${element.className}-${text}`);
  };

  const getElementType = (type: any): string => {
    if (typeof type === 'string') {
      return type.toLowerCase();
    }
    if (typeof type === 'function') {
      return type.name.toLowerCase();
    }
    return 'unknown';
  };

  const processNodes = useCallback(() => {
    if (!containerRef.current) return;

    const nodes: { element: Element; text: string }[] = [];
    const processedPaths = new Set<string>();

    const findTextNodes = (node: Node | null, path = '') => {
      if (!node) return;

      // Skip already processed paths
      if (processedPaths.has(path)) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim() || '';
        if (text.length > 1) {
          const parentElement = node.parentElement;
          if (parentElement && !nodes.some((n) => n.element === parentElement)) {
            // Skip elements with skip classes or tags
            const skipClasses = config?.skipClasses || [];
            const skipElements = config?.skipElements || [];

            const hasSkipClass = skipClasses.some((cls) => parentElement.classList.contains(cls));
            const isSkipElement = skipElements.includes(parentElement.tagName.toLowerCase());

            if (!hasSkipClass && !isSkipElement) {
              nodes.push({
                element: parentElement,
                text: text,
              });
              processedPaths.add(path);
            }
          }
        }
      }

      if (node.hasChildNodes()) {
        node.childNodes.forEach((child, index) => {
          findTextNodes(child, `${path}-${index}`);
        });
      }
    };

    findTextNodes(containerRef.current);

    const processed: { [key: string]: React.ReactNode } = {};
    const maxDisappearingLetters = Math.ceil(nodes.length * 1.5);

    const shuffledNodes = [...nodes].sort(() => Math.random() - 0.5).slice(0, maxDisappearingLetters);

    shuffledNodes.forEach((nodeInfo, i) => {
      const { element, text } = nodeInfo;
      const processedContent = processElementRef.current(element, i + 1);

      if (processedContent) {
        const key = getElementKey(element, text);
        processed[key] = processedContent;
      }
    });
    console.log('processed nodes', processed);
    setProcessedElements(processed);
  }, [config?.skipClasses, config?.skipElements]);

  useEffect(() => {
    if (!isEnabled) {
      setProcessedElements({});
      return;
    }

    processNodes();
  }, [isEnabled, processNodes]);

  const renderChildren = useCallback(
    (children: React.ReactNode): React.ReactNode => {
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        let elementText = '';
        if (typeof child.props.children === 'string') {
          elementText = child.props.children.trim();
          const key = parameterize(`${getElementType(child.type)}-${child.props.className || ''}-${elementText}`);
          if (processedElements[key]) {
            return processedElements[key];
          }
        }

        if (child.props.children) {
          const processedChildren = renderChildren(child.props.children);
          return React.cloneElement(child, {
            ...child.props,
            children: processedChildren,
          });
        }

        return child;
      });
    },
    [processedElements],
  );

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }} className={className} ref={containerRef}>
      <PhysicsProvider>{renderChildren(children)}</PhysicsProvider>
    </div>
  );
};
