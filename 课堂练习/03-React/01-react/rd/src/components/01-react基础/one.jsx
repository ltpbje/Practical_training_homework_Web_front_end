
import './one.css'
function one() {
    return (
        <>
            <div style={{color:'red'}}>我是第一个组件</div>
            <div className="box"></div>
            <label htmlFor="userName">
                用户名
                <input type="text" id='userName'/>
            </label>
        </>
    )
}


export default one;
