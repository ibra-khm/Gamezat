import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Pagination, Navigation, Keyboard, Autoplay } from "swiper";
// import required modules
import {  useDispatch, useSelector } from "react-redux";
import {  fetchGames } from "../../reducers/gameSlice";
import { BiDesktop, BiMobile, BiPhone, BiTab } from "react-icons/bi";
import { Link } from "react-router-dom";
// import games from "../../games.json";

export default function RandomGame() {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.games);
  const loading = useSelector((state) => state.games.loading);
  const [items, setItems] = useState([]);
  // useEffect(() => {
  // 	setItems(games);
  // }, [games]);
  // const [page, setPage] = useState(1);
  const [filterCateg, setFilterCateg] = useState({ other: false, puzzles: false, sports: false, racing: false, shooters: false, adventures: false, girls: false, strategy: false });
  const [filteredItems, setFilteredItems] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [nPages, setNPages] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(12);
  // const [indexOfLastRecord, setIndexOfLastRecord] = useState()
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage < 0 ? 0 : indexOfLastRecord - recordsPerPage;
  const [search, setSearch] = useState('')

  useEffect(() => {

    // items?.length - ((currentPage - 1) * recordsPerPage) < recordsPerPage ? setIndexOfLastRecord(items?.length) : setIndexOfLastRecord(recordsPerPage * currentPage)
    const num = Math.ceil(games?.length / recordsPerPage);
    if (num) {
      num <= 1 ? setNPages(1) : setNPages(num)
    }
    // setItems(games?.slice(indexOfFirstRecord, indexOfLastRecord))
  }, [games, currentPage, recordsPerPage])




  useEffect(() => {
    console.log(search);
  }, [search])



  // Pagination
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);





  useEffect(() => {

    console.log("hhhhhhhhhhhhhhh");
    // setFilteredItems(games)
    setItems(games?.slice(indexOfFirstRecord, indexOfLastRecord))


    const puzzles = games.filter(game => (game.title.toLowerCase()).includes(search.toLowerCase()));
    setItems(puzzles)

  }, [filterCateg, games, currentPage, recordsPerPage, search]);



  return (

      
      <>
    <div className='flex justify-around flex-wrap  p-10 rounded-3xl border-t-4 shadow-lg w-[95%] mx-auto border-amber  dark:bg-slate-800'>

        <Swiper

          breakpoints={{
            "@0.00": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            "@1.50": {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}


          slidesPerGroup={3}
          loop={true}
          loopFillGroupWithBlank={true}
          navigation={true}
          centeredSlides={true}

          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Keyboard, Autoplay]}
          keyboard={{
            enabled: true,
          }}
          className="mySwiper flex justify-center "
        >
          {

items.length === 0 ? <p className="text-3xl text-center">No Games</p>

: items?.map((game, i) =>{
              return (<SwiperSlide  > <Link key={game.id} to={`/games/${game.guid}`} class="group relative block bg-black w-72 h-72 mb-10 shadow-xl">
                <img
                  alt="Developer"
                  src={game.thumb}
                  class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                />

                <div class="relative p-4">
                  <p class="text-xl font-bold text-white">{game.title}</p>



                  <div class="mt-32">
                    <div
                      class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    >
                    
                    </div>
                  </div>
                </div>
              </Link> 
              </SwiperSlide>)
            })

          }


        </Swiper>
        </div>
      </>

    
  );
}

