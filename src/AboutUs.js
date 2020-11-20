import React, { Component } from "react";

export default class AboutUs extends Component {
  render() {
    return (
      <div className='about-us'>

        <img className='dee' src='/Dee-aboutus.gif' alt='Dee Watson' />

        <img className='evan' src='/evan-aboutus.gif' alt="Evan Finkelstein" />

        <img className='paul' src='/paul-aboutus.gif' alt='Paul Stevens' />

        <img className='jillian' src='/jillian-aboutus.gif' alt='Jillian Gibson' />

        <img className='sjaan' src='/sjaan-aboutus.gif' alt='Sjaan Hydrick' />

      <div className='about-us-chat-shell'>

        <p className='about-us-chat'>Chat</p>

      <div className='dee-bio'>
        <p className='about-us-label'>From <span className='about-us-name'>Dee Watson</span> to <span className='about-us-name'>Everyone</span>:</p>
        <p className='about-us-bio'>Dee is a human person and software engineer who cares about body goodness and feeling deeply. They have a love-hate relationship with Zoom and its CPU demands, and had never heard of it before March 2020.</p>
        <p className='about-us-link'><a className='link-text' href='https://www.linkedin.com/in/dl-watson/'>https://www.linkedin.com/in/dl-watson/</a></p>
        <p className='about-us-link'><a className='link-text' href='https://github.com/dl-watson'>https://github.com/dl-watson</a></p>
      </div>

      <div className='evan-bio'>
        <p className='about-us-label'>From <span className='about-us-name'>Evan Finkelstein</span> to <span className='about-us-name'>Everyone</span>:</p>
        <p className='about-us-bio'>Evan is a full stack developer who got tired of endlessly scrolling through videos looking for pertinent information. In his free time he likes to reminisce about the Before Time when he had hobbies and a social life. Now his only joys are coding and his cat Francis.</p>
        <p className='about-us-link'><a className='link-text' href='https://www.linkedin.com/in/evan-finkelstein91/'>https://www.linkedin.com/in/evan-finkelstein91/</a></p>
        <p className='about-us-link'><a className='link-text' href='https://github.com/Evan-Finkelstein'>https://github.com/Evan-Finkelstein</a></p>
      </div>

      <div className='paul-bio'>
        <p className='about-us-label'>From <span className='about-us-name'>Paul Stevens</span> to <span className='about-us-name'>Everyone</span>:</p>
        <p className='about-us-bio'>Paul is a software engineer and entrepreneur.  He is always dreaming of ways to make Zoom calls more useful, and less painful.</p>
        <p className='about-us-link'><a className='link-text' href='https://www.linkedin.com/in/paul-stevens-dev/'>https://www.linkedin.com/in/paul-stevens-dev/</a></p>
        <p className='about-us-link'><a className='link-text' href='https://github.com/Protopaco'>https://github.com/Protopaco</a></p>
      </div>

      <div className='jillian-bio'>
        <p className='about-us-label'>From <span className='about-us-name'>Jillian Gibson</span> to <span className='about-us-name'>Everyone</span>:</p>
        <p className='about-us-bio'>Jillian is a software engineer with a strong project management background. When not stuck in a Zoom meeting, she can be found geeking out over organizing or in nature, enjoying an adventure-based activity.</p>
        <p className='about-us-link'><a className='link-text' href='https://www.linkedin.com/in/jillianlgibson/'>https://www.linkedin.com/in/jillianlgibson/</a></p>
        <p className='about-us-link'><a className='link-text' href='https://github.com/jillianlg'>https://github.com/jillianlg</a></p>
      </div>

      <div className='sjaan-bio'>
        <p className='about-us-label'>From <span className='about-us-name'>Sjaan Hydrick</span> to <span className='about-us-name'>Everyone</span>:</p>
        <p className='about-us-bio'>Sjaan is a software engineer who wants users to have the best experience possible. She has a passion for great video games, bad television, and clean code.</p>
        <p className='about-us-link'><a className='link-text' href='https://www.linkedin.com/in/sjaan-hydrick/'>https://www.linkedin.com/in/sjaan-hydrick/</a></p>
        <p className='about-us-link'><a className='link-text' href='https://github.com/SjaanHydrick'>https://github.com/SjaanHydrick</a></p>
      </div>

      </div>
      </div>
    );
  }
}
