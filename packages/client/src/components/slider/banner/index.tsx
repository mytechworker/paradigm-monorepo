import React from 'react';
import Slider, { Settings } from 'react-slick';
import Image from 'next/image';

import { SliderProps } from '@client/types/slider.types';

const sliders = [
  {
    _id: '645269dd309d1a182269c0b7',
    title: 'Revolutionizing identity verification: An introduction to Proof of Personhood (PoP) protocols',
    image: '/images/slider-img-right.png',
    description:
      'In this paper, Proof of Personhood (PoP) protocols — types of identity verification mechanisms that aim to protect digital space from identity fraud — are explored. The narration starts with an overview of the PoP history, advantages and challenges, and primary use cases. Then, the main identity verification mechanisms, their benefits and limitations are outlined alongside initiatives utilizing them. Finally, a comparison of PoP protocols is provided. By highlighting the potential of PoP protocols to revolutionize the way we see identity verification in the Web3 era, this paper contributes to the ongoing discourse around digital identity and provides a foundation for future research and development in this area.',
    url: 'https://paradigmresear.ch/revolutionizing-identity-verification-an-introduction-to-proof-of-personhood-pop-protocols?id=6452692d309d1a182269c099&pageType=Blockchain%20%26%20Crypto',
    buttontext: 'See more',
    index: 0,
    __v: 0,
  },
  {
    _id: '63ce847092a342209932daf3',
    title: 'Decentralized science (DeSci): Web3-mediated future of science',
    image: 'https://paradigmresear.ch:7000/uploads/banners/image-1674566945452.png',
    description:
      'Our new research is an attempt to conceptualize the features of science in the context of digital transformation mediated by distributed ledger technologies, and blockchain. The focus is on an open alternative to the current academic system – decentralized science or DeSci, a new movement of scientists and enthusiasts, that stands for transparency, open-access scientific research, and crowd-sourced peer-review funded by the public and with crypto, that aims to increase social engagement, and collaboration across the field.',
    url: 'https://paradigmresear.ch/decentralized-science-desci-web3-mediated-future-of-science?id=63ce826092a342209932daae&pageType=Blockchain+%26+Crypto',
    buttontext: 'See more',
    index: 1,
    __v: 0,
  },
  {
    _id: '6419f31d309d1a1822688a57',
    title: 'Intellectual Property (In Science): The Potential & Advantages Of NFTs',
    image: 'https://paradigmresear.ch:7000/uploads/banners/image-1679422406751.png',
    description:
      'In our new research, we focus on NFTs, CC0 NFTs & IP-NFTs, their potential for IP management, science, and innovation. We list the main issues in the IP field in science and provide an overview of opportunities of DLT and blockchain for improving it. Then, we sketch an IP x NFTs ecosystem landscape, listing state-of-the-art initiatives, and discuss the main challenges of CC0- and IP-NFTs.',
    url: 'https://paradigmresear.ch/intellectual-property-in-science-the-potential-%26-advantages-of-nfts?id=6419eb95309d1a18226889ff&pageType=Blockchain%20%26%20Crypto',
    buttontext: 'See more',
    index: 2,
    __v: 0,
  },
  {
    _id: '645269dd309d1a182269c0b7',
    title: 'Revolutionizing identity verification: An introduction to Proof of Personhood (PoP) protocols',
    image: 'https://paradigmresear.ch:7000/uploads/banners/image-1683122652927.png',
    description:
      'In this paper, Proof of Personhood (PoP) protocols — types of identity verification mechanisms that aim to protect digital space from identity fraud — are explored. The narration starts with an overview of the PoP history, advantages and challenges, and primary use cases. Then, the main identity verification mechanisms, their benefits and limitations are outlined alongside initiatives utilizing them. Finally, a comparison of PoP protocols is provided. By highlighting the potential of PoP protocols to revolutionize the way we see identity verification in the Web3 era, this paper contributes to the ongoing discourse around digital identity and provides a foundation for future research and development in this area.',
    url: 'https://paradigmresear.ch/revolutionizing-identity-verification-an-introduction-to-proof-of-personhood-pop-protocols?id=6452692d309d1a182269c099&pageType=Blockchain%20%26%20Crypto',
    buttontext: 'See more',
    index: 0,
  },
];

const defaultSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
} as Settings;

const MainSlider: React.FC<SliderProps> = ({ className }) => {
  return (
    <>
      <div className="mian-slider">
        <div className="container cus-container">
          <div className="main-sec-slider">
            <div className="img-box-back" />
            <Slider {...defaultSettings} className="slider-main-text">
              {sliders &&
                sliders?.length > 0 &&
                sliders?.map((item: any, i: number) => {
                  return (
                    <div key={i}>
                      <div className="slider-text">
                        <div className="flex-div">
                          <div className="slider-text-left slide-box">
                            <h1>{`${item?.title}`}</h1>
                            <p>{item?.description}</p>
                            <div className="see-btn">
                              <button onClick={() => window.open(item?.url)}>{item?.buttontext}</button>
                            </div>
                          </div>
                          <div className="slider-text-right slide-box">
                            <Image
                              src={item?.image}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = '/static/images/noimage.png';
                              }}
                              alt={`slider image ${i}`}
                              width="540"
                              height="302"
                              className="lazzy-ssr-image"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSlider;
