import { Component } from "react";


export default class Unmount extends Component{
    render() {
        return (
            <>
                <div></div>
            </>
            )
    }
    dbClick() {
        console.log('我点击了这个页面');
    }
    componentDidMount() {
        document.addEventListener('click',this.dbClick)
    }
    componentWillUnmount() {
        console.log('当组件卸载时');
        document.removeEventListener('click',this.dbClick)
    }
}