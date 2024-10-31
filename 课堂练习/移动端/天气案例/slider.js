/*
效果实现说明：整个滑动效果都是基于修改transform:translateX()的横向偏移值来完成

在开始之前需要先给需要滑动的DOM元素添加两个自定义属性用来左临时记录
1、data-startx="" 用于记录每次单指触摸是的横向点位
2、data-length="0" 用于记录每次滑动的距离和方向，负值为左，默认值为0表示还没有滑动过，没有上次滑动距离需要记录

*/

window.onload = () => {
	//获取需要左右滑动的DOM元素
	slideBox = document.querySelector("#slide-box");
	
	//------------------------触摸开始------------------------------
	
	slideBox.addEventListener("touchstart", event => {
		//判断是否是单指触摸
		if (event.changedTouches.length == 1) {
			/*
			判断成立，在自定义属性data-startx中记录下单指触摸的起始点位
			同时，还要减去上次触摸滑动后移动的距离
			因为，每次滑动开始的点位就需要基于上次滑动的位置来计算
			所以，需要通过当次触摸的点位叠加上次移动的距离得到当次滑动的起始点位
			不然，会出现除第一次以外的后续滑动都会从 transform:translateX(0px)的位置开始滑动
			*/
			slideBox.dataset.startx = event.changedTouches[0].clientX - slideBox.dataset.length;
			//这里使用减法是去做叠加主要是因为，我们滑动范围是负值到0，所以减去负值相当于加上
		}
	})
	
	//------------------------触摸滑动中----------------------------
	
	slideBox.addEventListener("touchmove", event => {
		//实时记录滑动时候的x坐标
		var currentX = event.changedTouches[0].clientX;
		//通过实时记录的滑动时候的x坐标减去初始的x坐标，得到实时的滑动距离
		var _length = currentX - parseInt(slideBox.dataset.startx);
		//将实时的滑动距离实时的记录到自定义属性data-length中
		slideBox.dataset.length = _length;
		//判断实时划动距离_length是否在可以滑动的范围上限内（滑动范围，负的滑动元素溢出宽度值到0）
		if (_length < 0) {
			//判断实时滑动距离是否超过了滑动元素的溢出宽度，也就时可以滑动的下限范围
			if (_length > screen.width - slideBox.clientWidth) {
				//如果没有超过，就把滑动距离实时赋值给transform:translateX的偏移值，让滑动元素向左滑动
				slideBox.style.transform = `translateX(${_length}px)`;
			} else {
				//如果超过，直接把transform:translateX的偏移值赋值为滑动元素溢出部分的宽度值作为滑动的边界，不允许再向左滑动
				//这里再滑动元素溢出宽度的基础上增加80是为了后面触摸结束时实现滑动回弹的效果准备的，如果不需要可以不加
				slideBox.style.transform = `translateX(${screen.width - slideBox.clientWidth - 80}px)`;
				//把滑动元素溢出宽度赋值给自定义属性data-length记录这次滑动直接划到了下线范围边界
				slideBox.dataset.length = screen.width - slideBox.clientWidth
			}
		} else {
			//判断实时的滑动距离已经到达了滑动范围的上限，可以直接给transform:translateX上限值0
			//这里加上了80，也是为了制作触摸结束时的滑动回弹效果准备的
			slideBox.style.transform = `translateX(80px)`;
			//把距离上限0直接赋值给data-length记录供下次滑动使用
			slideBox.dataset.length = 0;
		}
		
		//--------------------触摸结束时--------------------------------
		
		slideBox.addEventListener("touchend", event => {
			/*
				判断如果触摸结束时已经滑动到了距离范围的上下边界的时候
				配合上面触摸滑动到边界时多移动80距离和给滑动元素添加的过渡样式
				再把transform的横向偏移值设置回上下边界值，从而实现回弹效果
			*/
			if (slideBox.dataset.length == screen.width - slideBox.clientWidth) {
				//当记录下来的滑动距离等于滑动元素溢出宽度时，把transform的x偏移值设置成溢出宽度值
				slideBox.style.transform = `translateX(${screen.width - slideBox.clientWidth}px`
			} else if (slideBox.dataset.length == 0) {
				//当记录下来的滑动距离等于可以滑动的上限范围0时，把transform的x偏移值设置为0
				slideBox.style.transform = `translateX(0px)`;
			}
		})
	})
}