import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'
import appConfig from 'src/shared/config/app.config';

class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />

          {/* Google Ads */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${appConfig.google.analytics.measurementId}"`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              
                gtag('config', '${appConfig.google.analytics.measurementId}');
              `,
            }}
          />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </body>
      </Html>
    )
  }
}

export default Document;
