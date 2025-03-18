import Image from "next/image";
import React from "react";
import BlogsList from "@/components/BlogsList";
import { getBlogDetail } from "@/queries/blog/getBlogs";
import Link from 'next/link';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const blogDetail = await getBlogDetail(slug);

  if (!blogDetail?.blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  const { title, description, image } = blogDetail.blog;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://thesupernaturaluniversity.com/blog/${slug}`,
      images: [
        {
          url: image?.src ?? 'https://via.placeholder.com/1600x400',
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      type: 'article',
    },
  };
}

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const socialLinks = (currentUrl) => [
  {
    href: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    src: "/fb.svg",
    alt: "Facebook",
  },
  {
    href: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    src: <div className='bg-black rounded-full p-1'><FaXTwitter color='white' className=' h-[16px] w-[16px] ' /></div>,
    alt: "Twitter",
  },
  {
    href: `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
    src: <IoLogoWhatsapp size={24} color='#0ac040' />,
    alt: "WhatsApp",
  }
];

const SocialShare = ({ slug }) => {
  const pathName = `https://thesupernaturaluniversity.com/blog/${slug}`;

  return (
    <div className="flex py-5">
      <div className="flex gap-4 items-center">
        <p className="text-title-lg">Share this:</p>
        {socialLinks(pathName).map(({ href, src, alt }, index) => (
          <Link
            href={href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 ease-in-out transform hover:scale-110 hover:opacity-80"
          >
            {typeof src === 'string' ? (
              <Image src={src} alt={alt} width={24} height={24} />
            ) : (
              src
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default async function Page({ params }) {
  const { slug } = params;
  const dummyImageUrl = 'https://via.placeholder.com/1600x400';
  const singleBlogDetail = await getBlogDetail(slug);
  const { title, image, description, createdAt } = singleBlogDetail?.blog;

  if (!title) {
    return <h1 className='text-center py-5'>Blog not found.</h1>;
  }

  return (
    <div>
      <main className="max-w-[1320px] px-[20px] pb-[20px] md:pb-[80px] pt-5 mx-auto">
        <section className="mb-2">
          <p className="text-heading-xl">{title}</p>
        </section>

        <div>
          <p className="text-subtitle-md text-primary mb-3">
            {formatDate(createdAt)}
          </p>
          <div className="relative aspect-[16/6] w-full">
            <img
              src={image?.src ?? dummyImageUrl}
              alt={title}
              className="rounded-[10px] w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className="mt-3 text-justify"
        ></div>

        <SocialShare slug={slug} />

        <section className="flex justify-center w-full my-[20px] md:my-[50px]">
          <div className="text-center">
            <h1 className="text-[#202020] text-heading-xl">Related Blogs</h1>
          </div>
        </section>

        <section>
          <BlogsList blogs={singleBlogDetail?.relatedBlogs ?? []} />
        </section>
      </main>
    </div>
  );
}
