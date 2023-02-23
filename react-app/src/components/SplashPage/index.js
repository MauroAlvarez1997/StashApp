import "./SplashPage.css";
// import { useSelector } from "react-redux";
// import HomePage from "../HomePage";


function SplashPage() {
	// const sessionUser = useSelector((state) => state.session.user);
	return (
		<>
		<div className='backgroudVideoContainer'>
      <video id="myVideo" autoPlay muted loop preload='auto'>
        <source src="https://cash-f.squarecdn.com/web/marketing/a54f6af79cd6c800b31099144ef2211e3c3859d5/assets/images/home-2022/WEB_HERO_16x9_x264_RF30.mp4" type="video/mp4"/>
      </video>
    </div>
    <h1 className='splashH1'>
      <span>DO MORE</span>
      <span>WITH YOUR</span>
      <span>MONEY</span>
    </h1>
    <h3 className='h3splashpage' >
      <span>Send it to me at $2ToMauro </span>
      <span> and <a className='githubLink' href='https://github.com/MauroAlvarez1997'> click here to access my <i class="fa-brands fa-github"></i> GitHub</a></span>
    </h3>
		</>
	);
}

export default SplashPage;
