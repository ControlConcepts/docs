// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require('prism-react-renderer');

const lightTheme = themes.github;
const darkTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Control Concepts Docs',
  tagline: 'Learn how to setup and use our power controllers',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://github.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ControlConcepts', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  githubHost: 'github.com',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      './src/plugins/pdf-plugin',
      {
        keepDebugHtmls: false,
        sidebarNames: ['tutorialSidebar'],
        addDownloadButton: true,
        autoBuildPdfs: true,
        ignoreDocs: ['licenses'],
        author: 'Control Concepts, Inc.',
        getPdfCoverPage: (siteConfig, pluginConfig, pageTitle, version) => {
          return `
          <!DOCTYPE html>
          <html>
          <head>
            
          </head>
      
            <body>
              <div style="margin: 2cm;">
                <h1 style="color:#005479;font-size:28px;font-family:sans-serif;font-weight:bold">${siteConfig.projectName}<h1>
                <h2 style="color:#005479;font-size:16px;font-family:sans-serif;">${(pageTitle || siteConfig.tagline)}<h2>
      
                <dl style="font-family:sans-serif;margin-top:10em;display: flex; flex-flow: row; flex-wrap: wrap; width: 600px; overflow: visible;color:#005479;font-size:12px;font-weight:normal;">
                  <dt style="margin-top:1em;flex: 0 0 20%; text-overflow: ellipsis; overflow: hidden;">Author:</dt>    
                  <dd style="margin-top:1em;flex:0 0 80%; margin-left: auto; text-align: left;text-overflow: ellipsis; overflow: hidden;">Control Concepts, Inc.</dd>
                  <dt style="margin-top:1em;flex: 0 0 20%; text-overflow: ellipsis; overflow: hidden;">Date:</dt>
                  <dd style="margin-top:1em;flex:0 0 80%; margin-left: auto; text-align: left;text-overflow: ellipsis; overflow: hidden;">${new Date().toISOString().substring(0, 10)}</dd>
                </dl>
              </div>
            </body>
      
          </html>
        `;
        }
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Control Concepts Docs',
        logo: {
          alt: 'CCI Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Quick Links',
            items: [
              {
                label: 'Home',
                to: 'https://ccipower.com/',
              },
              {
                label: 'About Us',
                to: 'https://ccipower.com/about-us',
              },
              {
                label: 'Careers',
                to: 'https://ccipower.com/careers',
              },
              {
                label: 'Terms & Conditions',
                to: 'https://ccipower.com/contact-us/contact-information/terms-conditions',
              },
              {
                label: 'How to Order',
                to: 'https://ccipower.com/contact-us/contact-information/how-order',
              },
              {
                label: 'Support',
                to: 'https://ccipower.com/customer-support',
              },
              {
                label: 'Rep Portal',
                to: 'https://ccipower.com/rep-portal',
              },
              {
                label: 'Control Panel Software',
                to: 'https://ccipower.com/products/accessories/control-panel-software',
              },
            ],
          },
          {
            title: 'Product Links',
            items: [
              {
                label: 'Phase Angle SCR Controllers',
                href: 'https://ccipower.com/product-category/phase-angle',
              },
              {
                label: 'Zero Cross SCR Controllers',
                href: 'https://ccipower.com/product-category/zero-cross',
              },
              {
                label: 'Analog - SCR Controllers',
                href: 'https://ccipower.com/product-category/analog-scr',
              },
              {
                label: 'Solid State Relay Controllers',
                href: 'https://ccipower.com/product-category/solid-state-relay',
              },
              {
                label: 'Digital - SCR Controllers',
                href: 'https://ccipower.com/product-category/digital-scr',
              },
              {
                label: 'Custom / OEM Products',
                href: 'https://ccipower.com/products/customoem-products',
              },
              {
                label: 'Fuses',
                href: 'https://ccipower.com/fuses',
              },
              {
                label: 'Accessories',
                href: 'https://ccipower.com/accessories',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ccipower/docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Control Concepts, Inc.`,
      },
      prism: {
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
