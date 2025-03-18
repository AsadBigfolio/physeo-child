import StoryProvider from '@/providers/StoryProvider';

const layout = ({ children }) => {
  return <StoryProvider>{children}</StoryProvider>;
};
export default layout;
