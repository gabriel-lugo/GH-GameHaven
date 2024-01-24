import { Box, Title } from "@mantine/core";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

interface ShareButtonsProps {
  shareUrl: string;
  gameName: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ shareUrl, gameName }) => {
  return (
    <>
      <Title mb={"xs"} order={4}>
        Share
      </Title>
      <Box mb={"xl"} className="share-buttons-container">
        <FacebookShareButton url={shareUrl} title={gameName}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <RedditShareButton url={shareUrl} title={gameName}>
          <RedditIcon size={32} round />
        </RedditShareButton>
        <TwitterShareButton url={shareUrl} title={gameName}>
          <XIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={gameName}
          body="Check out this game!"
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </Box>
    </>
  );
};

export default ShareButtons;
