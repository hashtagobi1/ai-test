const Contact = () => {
  return (
    <div className="flex items-center justify-center">
      <a href="mailto:anokwuruobi@gmail.com?subject=Front%20End%20Developer%20interview&body=Hi%20Obi%2C%20we%20have%20seen%20your%20AI%20demo%20and%20we%20would%20love%20to%20discuss%20next%20steps.">
        <button className="btn  border text-transparent bg-gradient-to-r from-pink-500 via purple-500 to-indigo-500 bg-clip-text rounded-full mr-5">
          Contact Obi
        </button>
      </a>
      <a
        href="https://obi-portfolio.vercel.app/"
        target="_blank"
        rel="noreferrer"
      >
        <button className="btn border text-transparent bg-gradient-to-r from-pink-500 via purple-500 to-indigo-500 bg-clip-text rounded-full btn-outline ">
          View Portfolio
        </button>
      </a>
    </div>
  );
};

export default Contact;
