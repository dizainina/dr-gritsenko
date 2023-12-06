import { useState, useEffect } from "react";
import "./index.css";
import data from "./publications.json";
import Modal from "./Modal"

export default function App2() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState('');

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    // создаем состояния, отвечающие за видимость окна
    const [modalActive, setModalActive] = useState(false);

    // вывод элементов в зависимости от ширины экрана
    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 1024;
    useEffect(() => {
      const handleResizeWindow = () => setWidth(window.innerWidth);
        // подписываемся на измененеие окна
      window.addEventListener("resize", handleResizeWindow);
      if(width > breakpoint) {
        setItemPerPage(3);
        // console.log(itemPerPage)
      } else {
        setItemPerPage(2);
        // console.log(itemPerPage)
      }
      return () => {
        // отписываемся
        window.removeEventListener("resize", handleResizeWindow);
      };
    });


    //  функция для открытия публикации в модальном окне и получение id поста
    const openCard = (e) => {
      const cardId = e.currentTarget.dataset.id;
      setModalActive(true);
      setItemPerPage('');
      console.log(cardId)
    };


    return (
    <div className="App2">
        <h1>Публикации</h1>
        <div className="posts-card">
            {currentItems.map((item) => (
            <div className="post-item open-btn" data-id={item.id} key={item.id} id={item.id}
            onClick={openCard}>
                <div className="div-for-img-small-post">
                    <img className="post-item-img" src={item.imagePathSmall} alt=""/>
                </div>
            
                <p className="titleMain">{item.titleMain}</p>
                <p className="title">{item.title.slice(0,100)}...</p>
                <p className="date">{item.date}</p>
            </div>
            ))}
        </div>

        <div className="show-more">

        {currentPage < Math.ceil(data.length / itemPerPage) && (
        <button className="show-more-button" onClick={() => paginate(currentPage+1)}>Показать еще <img src="./images/arrow-circle.svg" alt="" /></button>
        )}

        {currentPage === Math.ceil(data.length / itemPerPage) && (
        <button className="show-more-button" onClick={() => paginate(currentPage - (Math.ceil(data.length / itemPerPage) - 1))}>Вернуться назад <img src="./images/arrow-circle.svg" alt="" /></button>
        )}


        </div>
        
        <Modal active={modalActive} setActive={setModalActive}>
          <div className="postsPopup">
            <div className="closePostsPopup" onClick={() => setModalActive(false)}>
              <span className="closePostsPopup-img"><img src="images/ei_close_black.svg" alt="" /></span>
            </div>

            <div className="container_postsPopup">
              {currentItems.map((item) => (
              <div className="modal-container_postsPopup" key={item.id}>
                <div className="head-post">
                  <div className="title-head-post">
                    <h1 className="titleMainHead">{item.titleMain}</h1>
                    <p className="date" style={{fontSize: 16 + "px"}}>{item.date}</p>
                  </div>
                  <div className="repost">
                      <p className="date" style={{fontSize: 14 + "px", marginRight: 15 + "px"}}>Поделиться статьей:</p>
                      <div className="repost-icon">
                        <a href="https://vk.com/share.php?url=http://localhost:3000&text=Врач+Гриценко+Сергей" target="_blank" rel="noreferrer"><img src="images/vk.png" alt=""/></a>
                        <a href="https://connect.ok.ru/offer?url=http://localhost:3000&text=Врач+Гриценко+Сергей"  target="_blank" rel="noreferrer"><img src="images/ok.png" alt="" /></a>
                        <a href="http://twitter.com/share?http://localhost:3000&text=Врач+Гриценко+Сергей"  target="_blank" rel="noreferrer"><img src="images/twitter.png" alt="" /></a>
                        <a href="https://telegram.me/share/url?url=http://localhost:3000&text=Врач+Гриценко+Сергей"  target="_blank" rel="noreferrer"><img src="images/telegramm.png" alt="" /></a>
                      </div>
                  </div>
                </div>
                <div className="head-img">
                  <img src={item.imagePath} alt=""/>
                </div>
                <div className="main-post">
                  <h2 className="title-main-post">{item.title}</h2>
                  <p className="item-message">{item.message}</p>
                </div>
                <div className="div-for-quote">
                  <div className="quote-post">
                    <div>
                      <img  style={{borderRadius: 50 + "%", marginBottom: 25 + "px"}} src="images/post-portret.jpg" alt=""/>
                      <p className="margin-top-post" style={{fontSize: 16 + "px", marginBottom: 5 + "px", marginRight: 146 + "px", width: 160 + "px"}}> <b>Сергей Гриценко</b> </p>
                      <p style={{fontSize: 14 + "px"}}>Врач-кинезиолог</p>
                    </div>
                    <p className="quote" >{item.quote}</p>
                  </div>
                  <img className="img-quotation-marks" src="images/quotation-marks.png" alt=""/>
                  <img className="img-quotation-marks-for-mobile" src="images/quotation-marks.png" alt=""/>
                </div>
              </div>
              ))}
            </div>
          </div>
        </Modal>
    </div>
    );
  }