import { NextSeo } from 'next-seo';

const Page = ({
  children,
  title = '',
  description = '',
  canonical = '',
  keywords = '',
  images,
}) => (
  <>
    <NextSeo
      title={title}
      defaultTitle="The Super Natural"
      description={
        description || 'This example uses more of the available config options.'
      }
      keywords={keywords}
      canonical={'https://thesupernaturaluniversity.com/' + canonical}
      openGraph={{
        url: 'https://thesupernaturaluniversity.com/',
        title: title,
        description: description,
        images,
        siteName: 'SupperU',
      }}
      twitter={{
        handle: '@handle',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
    {children}
  </>
);

export default Page;
