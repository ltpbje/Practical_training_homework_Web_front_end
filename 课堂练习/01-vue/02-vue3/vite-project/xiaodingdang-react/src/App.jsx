import './App.scss';
import { NavBar, Rate, Swiper, TabBar } from 'antd-mobile';
import { AppOutline, ContentOutline, SearchOutline, UserOutline } from 'antd-mobile-icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const searchIcon = (
    <SearchOutline></SearchOutline>
  );
  const userIcon = (
    <UserOutline />
  );
  const [swiperData, setSwiperData] = useState([]);
  // 轮播图信息数据
  const renderSwiperData = async () => {
    const results = (await axios.get('http://127.0.0.1:8900/category')).data.list;
    let _length = Math.ceil(results.length / 8);
    let arr = [];
    for (let i = 0; i < _length; i++) {
      if (i < _length - 1) {
        arr.push(results.splice(0, 8));
      } else {
        arr.push(results);
      }

    }
    setSwiperData(arr);

    // console.log(arr);
  };
  useEffect(() => {
    renderSwiperData();
    getShopList();
  }, []);
  const tabs = [
    {
      key: 'home',
      title: '外卖',
      icon: <AppOutline />,

    },
    {
      key: 'todo',
      title: '搜索',
      icon: <SearchOutline />,

    },
    {
      key: 'message',
      title: '新闻',
      icon: <ContentOutline />,

    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <UserOutline />,
    },
  ];
  // 商家列表数据
  const [shopListData, setShopListData] = useState([]);
  const getShopList = async () => {
    const arr = (await axios.get('http://127.0.0.1:8900/shops')).data.list;
    console.log(arr);
    setShopListData(arr);

  };
  return (
    <>

      <div className='content'>
        <div className="title-bar">
          <NavBar backIcon={searchIcon} right={userIcon}>
            外卖
          </NavBar>
        </div>
        <div className="main_section">
          <div className="swiper">
            <Swiper
              loop
              // autoplay
              onIndexChange={i => {
                console.log(i, 'onIndexChange1');
              }}
            >
              {
                swiperData.map((item, index) => {
                  return (
                    <Swiper.Item key={index} className='flex-row'>
                      <>
                        {
                          item.map((item, index) => {
                            return (
                              <div className='banner-item' key={index}>
                                <img src={`http://127.0.0.1:8900/${item.image_url}`} alt="" />
                                <span>
                                  {item.title}
                                </span>
                              </div>
                            );
                          })
                        }

                      </>
                    </Swiper.Item>
                  );
                })
              }
            </Swiper>
          </div>
          <div className="shop-list">
            {
              shopListData.map((item) => {
                return (
                  <div className="shop-item flex-row a-c" key={item.id}>
                    <div className="shop-left flex-row a-c">
                      <img src={`http://127.0.0.1:8900/${item.image_path}`} alt="" />
                    </div>
                    <div className='shop-center flex-1 flex-column j-c'>
                      <div className="shop-title flex-row a-c">
                        <span>品牌</span>
                        <h3>{item.name}</h3>
                      </div>
                      <div className="shop-rate flex-row a-c">
                        <Rate readOnly value={item.rating} style={{ '--star-size': '14px' }} />
                        <div className="rate-score">{item.rating}</div>
                        <div className="sale-count">
                          月销：{item.recent_order_num}单
                        </div>
                      </div>
                      <div className="shop-costs">
                        <span>￥{item.float_minimum_order_amount}元起送 ／ 配送费约{
                          item.float_delivery_fee
                        }元</span>
                      </div>
                    </div>
                    <div className="shop-right flex-column j-c">
                      <div className="shop-support">
                        {
                          item.supports.map((item, index) => {
                            return (
                              <span key={index}>
                                {item.icon_name}
                              </span>
                            );
                          })
                        }
                      </div>
                      <div className="shop-server">
                        <span>{item.delivery_mode.text}</span>
                      </div>
                    </div>
                  </div>
                );
              })

            }
          </div>

        </div>
      </div>
      <div className="tab_bar">
        <TabBar>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </>
  );
}

export default App;
