import PlayerSetup from '@/components/PlayerSetup';
import { getVideoById } from '@/trpc/video/controller';
import { notFound } from 'next/navigation';

export async function generateMetadata({ searchParams }) {
  const videoId = searchParams.video;

  if (!videoId) {
    return {
      title: 'Video Not Found',
      description: 'The requested video could not be found'
    };
  }

  const video = await getVideoById(videoId);

  if (!video) {
    return {
      title: 'Video Not Found',
      description: 'The requested video could not be found'
    };
  }

  return {
    title: video.title,
    description: video.description,
    keywords: video.topics.join(', '),
    openGraph: {
      title: video.title,
      description: video.description,
      images: [
        {
          url: `https://yourdomain.com/api/thumbnail/${video.thumbnail.$oid}`,
          width: 1200,
          height: 630,
          alt: video.title,
        },
      ],
      type: 'video.other',
      videos: [
        {
          url: video.videoUrl,
          width: 1280,
          height: 720,
          type: 'application/x-mpegURL',
        },
      ],
    },
    twitter: {
      card: 'player',
      title: video.title,
      description: video.description,
      player: {
        url: video.videoUrl,
        width: 1280,
        height: 720,
      },
      images: [
        `https://yourdomain.com/api/thumbnail/${video.thumbnail.$oid}`,
      ],
    },
  };
}

export default async function Page({ searchParams }) {

  return (
    <div className="container mx-auto px-4 py-8">
      <PlayerSetup />
    </div>
  );
}