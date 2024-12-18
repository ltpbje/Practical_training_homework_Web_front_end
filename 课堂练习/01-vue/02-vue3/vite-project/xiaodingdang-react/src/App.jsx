import './App.css';
import { Badge, NavBar, Swiper, TabBar } from 'antd-mobile';
import { AppOutline, MessageFill, SearchOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';
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
  }, []);

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      badge: Badge.dot,
    },
    {
      key: 'todo',
      title: '待办',
      icon: <UnorderedListOutline />,
      badge: '5',
    },
    {
      key: 'message',
      title: '消息',
      icon: (active) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
    },
    {
      key: 'personalCenter',
      title: '我的',
      icon: <UserOutline />,
    },
  ];
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
                              <div className='banner-item'>
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
