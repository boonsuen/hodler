import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default {
  plugins: ['react-static-plugin-styled-components'],
  getSiteData: () => ({
    title: "Hodler"
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/pages/Home',
      },
      {
        path: '/watch',
        component: 'src/pages/Watch',
      },
      {
        is404: true,
        component: 'src/pages/404'
      }
    ];
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends React.Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
  webpack: (config, { defaultLoaders, stage }) => {
    if (stage !== "dev") {
      // UglifyJS for production build
      // config.plugins.push(
      //   new UglifyJsPlugin()
      // );
    }

    return config;
  },
  disableRouteInfoWarning: true,
  bundleAnalyzer: false
};