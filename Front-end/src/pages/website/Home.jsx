import Banner from "../../components/Banner/Banner";
import SwiperGiftGame from "../../components/GiftsSwiper/SwiperGiftGame";
import RandomGame from "../../components/SelectRandomGame/RandomGames";
import TopRatingGames from "../../components/Top Rating/TopRatingGames";
import { IoAccessibilitySharp, IoArrowForward, IoGiftSharp } from "react-icons/io5";
import { GiAbstract050, GiStaryu, IconName } from "react-icons/gi";
import CommunityBanner from "../../components/Banner/CommunityBanner";
import Community from "../../components/CommunityBanner/Community";
import { Link } from "react-router-dom";

export default function Home() {



    return (
        <>

            <div className="">
                <Banner />
            </div>

            <div className="my-10 dark:bg-blue-gray-900 ">
                <h1 className="p-6 text-3xl text-center flex  "> <IoGiftSharp className="mr-2 text-red-600" />Free Games</h1>
                <SwiperGiftGame />
            </div>


            <div className="mt-10 ">
                <CommunityBanner />
            </div>

            <div className="mt-6 ">
                <h1 className="p-6 text-3xl text-center flex "><GiStaryu className="mr-2 text-blue-600 " />Top Rated Games</h1>
                <TopRatingGames />
            </div>

            <div className="mt-6 ">
                <div className="flex justify-between">

                    <h1 className="p-6 text-3xl text-center flex "><IoAccessibilitySharp className="mr-2 text-red-600" />Community</h1>
                    <Link to={'/community'}><h1 className="p-6 mt-3 font-bold text-center flex text-blue-600"> See More <IoArrowForward className="mr-2 mt-1" /> </h1></Link>
                </div>
                <Community />
            </div>

            <div className="mt-6 text-center">

                <h1 className="p-6 text-3xl text-center flex "><GiAbstract050 className="mr-2  text-blue-600 " /> Play A Random Game </h1>
                < RandomGame />
            </div>

        </>
    );
}
