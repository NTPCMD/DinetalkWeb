import { defineDocumentModel, defineStackbitConfig } from '@stackbit/sdk';

export default defineStackbitConfig({
  stackbitVersion: '^1.0.0',
  contentSources: [
    {
      name: 'site-content',
      type: 'filesystem',
      path: 'src/content',
      models: [
        defineDocumentModel({
          name: 'page',
          type: 'page',
          label: 'Page',
          match: 'pages/*.json',
          fields: [
            { name: 'title', type: 'string', label: 'Title' },
            { name: 'hero', type: 'object', label: 'Hero', fields: [] },
            { name: 'sections', type: 'list', label: 'Sections', items: { type: 'object', fields: [] } },
            { name: 'cta', type: 'object', label: 'Call to Action', fields: [] },
          ],
        }),
        defineDocumentModel({
          name: 'navigation',
          type: 'data',
          label: 'Navigation',
          match: 'navigation.json',
          fields: [
            { name: 'links', type: 'list', label: 'Links', items: { type: 'object', fields: [] } },
            { name: 'cta', type: 'object', label: 'Primary CTA', fields: [] },
          ],
        }),
        defineDocumentModel({
          name: 'footer',
          type: 'data',
          label: 'Footer',
          match: 'footer.json',
          fields: [
            { name: 'brand', type: 'object', label: 'Brand', fields: [] },
            { name: 'quickLinks', type: 'list', label: 'Quick Links', items: { type: 'object', fields: [] } },
            { name: 'contact', type: 'object', label: 'Contact', fields: [] },
          ],
        }),
        defineDocumentModel({
          name: 'mobileCta',
          type: 'data',
          label: 'Mobile CTA',
          match: 'mobile-cta.json',
          fields: [
            { name: 'label', type: 'string', label: 'Label' },
            { name: 'target', type: 'string', label: 'Target' },
          ],
        }),
      ],
    },
  ],
});
