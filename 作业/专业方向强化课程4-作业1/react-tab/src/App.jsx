import React from 'react';
import './App.css'

class App extends React.Component {
  constructor() {
    super();
  }
  state = {
    acitveIndex: 0,
    tabList: [
      {
        id: 0,
        content:'iconfont icon-my'
      },
      {
        id: 1,
        content:'iconfont icon-weixin'
      },
      {
        id: 2,
        content:'iconfont icon-dingdan'
      },
      {
        id: 3,
        content:'iconfont icon-canju'
      },
    ],
      pageList: [
      {
        id: 0,
        content:'你好'
      },
      {
        id: 1,
        content:'Jay'
      },
      {
        id: 2,
        content:'Chou'
      },
      {
        id: 3,
        content:'DT'
      },
    ]
  }
  // 切换tab页
  clickTab(index) {
    console.log(this.state.tabList[index]);
    this.setState({
      acitveIndex: index
    })
  }
  render() {
    return (
      <>
        <ul className='tabBox'>
        {this.state.tabList.map((item,index) => {
          return(
            <li key={item.id} className={item.id == this.state.acitveIndex ? 'tabItem active' : 'tabItem'} onClick={this.clickTab.bind(this, index)}>
              <span className={item.content}></span>

            </li>
          )
        })}
        </ul>{this.state.pageList.map((item) => {
          return (
            <div key={item.id} className={item.id == this.state.acitveIndex ? 'show' : 'hidden'}></div>
          )
        })
        }         
      </>  

      )
  }
}
export default App
