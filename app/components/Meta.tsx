import type { ComponentType, SVGProps } from 'react';

export type ProductMeta = {
  title: string;
  subtitle?: string;
  image: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export type MetaProps = {
  origin: string;
  productMeta: ProductMeta;
};

export const Meta = ({ origin, productMeta }: MetaProps) => {
  const { title, subtitle: description, image } = productMeta;
  const imagePath = new URL(image, origin).href;

  const metas = [
    { name: 'description', content: description },
    { tagname: 'link', rel: 'canonical', href: origin },
    { property: 'og:url', content: origin },
    { name: 'og:image', content: imagePath },
    { name: 'twitter:image', content: imagePath },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@originprotocol' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ] as const;

  return (
    <>
      <title>{title}</title>
      {metas.map((m, i) => (
        <meta key={`meta-${i}`} {...m} />
      ))}
    </>
  );
};
