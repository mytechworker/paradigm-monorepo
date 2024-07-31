import React from 'react';
import Link from 'next/link';

// icons
import MediumIcon from '@client/components/icons/MediumIcon';
import TwitterIcon from '@client/components/icons/TwitterIcon';
import TelegramIcon from '@client/components/icons/TelegramIcon';
import RedditIcon from '@client/components/icons/RedditIcon';
import LinkedinIcon from '@client/components/icons/LinkedinIcon';
import ChatIcon from '@client/components/icons/ChatIcon';
import DiscordIcon from '@client/components/icons/DiscordIcon';

import SocialMediaIcons from '@client/components/icons/SocialMediaIcons';

const handleRoutes = (url: string) => {
  if (url) {
    window.open(url, '_blank');
  }
};

const Footer: React.FC = () => {
  const FooterLinks = [
    {
      title: 'About Paradigm',
      href: '/about',
    },
    {
      title: 'Latest Stories',
      href: '/about',
    },
    {
      title: 'Terms',
      href: '/about',
    },
    {
      title: 'Privacy',
      href: '/about',
    },
  ];

  return (
    <footer>
      <div className="container">
        <div className="footer-sec">
          <div className="footer-menu">
            <div className="social-icons-wrapper">
              <SocialMediaIcons
                Icon={<MediumIcon width="26" height="26" />}
                onClick={() => handleRoutes('https://medium.com/paradigm-assotiates')}
                title="Medium"
                placement="topLeft"
              />
              <SocialMediaIcons
                Icon={<TwitterIcon width="26" height="26" />}
                onClick={() => handleRoutes('https://twitter.com/Paradigm_hub')}
                title="Twitter"
                placement="topLeft"
              />
              <SocialMediaIcons
                Icon={<TelegramIcon width="26" height="26" />}
                onClick={() => handleRoutes('https://t.me/paradigm_research')}
                title="Telegram"
                placement="topLeft"
              />{' '}
              <SocialMediaIcons
                Icon={<ChatIcon width="26" height="26" />}
                onClick={() => handleRoutes('https://t.me/paradigm_hub')}
                title="Telegram Chat"
                placement="topLeft"
              />
              <SocialMediaIcons
                Icon={<RedditIcon width="26" height="26" />}
                onClick={() => handleRoutes('https://www.reddit.com/r/Paradigm_fund/')}
                title="Reddit"
                placement="topLeft"
              />
              <SocialMediaIcons
                Icon={<LinkedinIcon width="26" height="26" />}
                onClick={() => handleRoutes('https://www.linkedin.com/company/paradigm-fund')}
                title="Linkedin"
                placement="topLeft"
              />
              <SocialMediaIcons
                Icon={<DiscordIcon width="26" height="26" fill="#000" />}
                onClick={() => handleRoutes('https://discord.com/invite/RQNs87kqx3')}
                title="Discord"
                placement="topLeft"
              />
              <div className="footer-sub-menu">
                {FooterLinks.map((item, i) => (
                  <Link href={item.href} key={i}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
