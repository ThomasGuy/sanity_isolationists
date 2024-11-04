// sanity.config.js
import { defineConfig } from 'sanity'
import { dashboardTool } from '@sanity/dashboard'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

export default defineConfig({
  title: 'isolationists',
  projectId: 'ukbaygfd',
  dataset: 'production',
  perspective: 'published',
  plugins: [structureTool(), visionTool(), dashboardTool({
    widgets: [
      netlifyWidget({
    title: 'My Netlify deploys',
    sites: [
      {
        title: 'Sanity Studio',
        apiId: '7f1009ce-9a33-4fb1-89f9-313d2f3d3923',
        buildHookId: 'https://api.netlify.com/build_hooks/66ff71ff0c21d79f004de9f9',
        name: 'sanity-isolationists-gallery',
      },
    ]
})]})],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => templateItem.templateId != 'settings')
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(({ action }) => !['unpublish', 'delete','duplicate'].includes(action))
      }
      return prev
    },
  },
});
