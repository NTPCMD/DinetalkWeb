import { useEffect } from 'react';

type StructuredData = Record<string, unknown>;

type OpenGraph = {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
};

type TwitterCard = {
  title?: string;
  description?: string;
  image?: string;
  card?: string;
};

interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?: string;
  author?: string;
  openGraph?: OpenGraph;
  twitter?: TwitterCard;
  structuredData?: StructuredData[];
}

const SITE_URL = 'https://dinetalk.com.au';

function upsertMetaByName(name: string, content: string) {
  if (typeof document === 'undefined') return;
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  if (typeof document === 'undefined') return;
  let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(url: string) {
  if (typeof document === 'undefined') return;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function usePageMetadata(options: PageMetadataOptions) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const {
      title,
      description,
      keywords,
      canonicalUrl,
      robots,
      author,
      openGraph,
      twitter,
      structuredData,
    } = options;

    document.title = title;

    upsertMetaByName('description', description);

    if (keywords?.length) {
      upsertMetaByName('keywords', keywords.join(', '));
    }

    const robotsValue = robots ?? 'index, follow';
    upsertMetaByName('robots', robotsValue);

    if (author) {
      upsertMetaByName('author', author);
    }

    const canonical = canonicalUrl || SITE_URL;
    setCanonical(canonical);

    if (openGraph) {
      if (openGraph.title) {
        upsertMetaByProperty('og:title', openGraph.title);
      }
      if (openGraph.description) {
        upsertMetaByProperty('og:description', openGraph.description);
      }
      if (openGraph.image) {
        upsertMetaByProperty('og:image', openGraph.image);
      }
      upsertMetaByProperty('og:type', openGraph.type || 'website');
      upsertMetaByProperty('og:url', openGraph.url || canonical);
    }

    if (twitter) {
      if (twitter.card) {
        upsertMetaByName('twitter:card', twitter.card);
      }
      if (twitter.title) {
        upsertMetaByName('twitter:title', twitter.title);
      }
      if (twitter.description) {
        upsertMetaByName('twitter:description', twitter.description);
      }
      if (twitter.image) {
        upsertMetaByName('twitter:image', twitter.image);
      }
    }

    const appendedScripts: HTMLScriptElement[] = [];

    if (structuredData?.length) {
      structuredData.forEach((schema) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.dataset.pageStructured = 'true';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
        appendedScripts.push(script);
      });
    }

    return () => {
      appendedScripts.forEach((node) => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });
    };
  }, [JSON.stringify(options)]);
}
