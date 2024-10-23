"use client"
import Feed from "@components/Feed";
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        <TypeAnimation
          sequence={[
            'Discover & Share',
            3000,
            'Create & Explore',
            3000,
            'Imagine & Build',
            3000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
        <br className="max-md:hidden" />
         <span className="orange_gradient text-center">
          AI Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        PromptVerse is an open-source AI prompting tool for modern world to discover, create and share creative prompts.
      </p>
      <Feed />
    </section>
  )
};

export default Home;