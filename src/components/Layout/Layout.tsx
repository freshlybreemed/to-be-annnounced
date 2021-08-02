import {FunctionComponent, useState, useEffect} from 'react';
import { Nav, Footer } from '.';
import Head from 'next/head';
import classnames from 'classnames';
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_IMAGE,
} from '../../constants/env';

interface LayoutProps {
  noPadding?: boolean;
  data?: {
    title: string;
    header: string;
    description: string;
  };
}
export const Layout: FunctionComponent<LayoutProps> = ({
  noPadding,
  children,
  data,
}) => {
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [slidingMenuOpen, setSlidingMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", handleScroll);
    }
  });

  useEffect(() => {
    if (document && slidingMenuOpen) {
      const header = document.getElementById("header");
      console.log(header);
      setHeaderHeight(header?.clientHeight || 0);
    }
  });
  const handleScroll = () => {
    setHeaderHeight(window?.pageYOffset);
  };


  return (
  <div>
    <Nav headerHeight={headerHeight} setVisible={setSlidingMenuOpen} visible={slidingMenuOpen} />

  <div
    className={`bg-black white ${classnames({
      'pa4-ns pa3': !noPadding,
    })} relative`}
  >
    {/*language=PostCSS*/}
    <Head> 
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={data ? data.header : SITE_NAME} />
      <meta property="og:title" content={data ? data.title : SITE_TITLE} />
      <title>{data ? data.title : SITE_TITLE}</title>
      <meta
        property="og:description"
        content={data ? data.description : SITE_DESCRIPTION}
      />
      <meta property="og:image" content={SITE_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_NAME} />
      <meta name="twitter:title" content={SITE_TITLE} />
      <meta name="twitter:description" content={SITE_DESCRIPTION} />
      <meta property="twitter:image" content={SITE_IMAGE} />
      <meta
        name="format-detection"
        content="telephone=no, address=no, email=no"
      />
    </Head>
    <div
      className="db"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        opacity: 0.55,
        background: 'url(/static/line-background.svg) 50% no-repeat',
        backgroundSize: 'cover',
      }}
    />
    <div
      className={`${classnames({
        'pa4-ns pa3': noPadding,
      })}`}
    >
    </div>
    <main className="z-0 relative mt5">{children}</main>
    <div
      className={`${classnames({
        'pa4-ns pa3': noPadding,
      })}`}
    >
      <Footer />
    </div>
    </div>
  </div>
  );
}
