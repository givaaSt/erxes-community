module.exports = {
  name: 'documents',
  port: 3012,
  scope: 'documents',
  exposes: {
    './routes': './src/routes.tsx'
  },
  routes: {
    url: 'http://localhost:3012/remoteEntry.js',
    scope: 'documents',
    module: './routes'
  },
  menus: [
    {
      text: 'Documents',
      to: '/documents',
      image: '/images/icons/erxes-18.svg',
      location: 'settings',
      scope: 'documents'
    }
  ]
};