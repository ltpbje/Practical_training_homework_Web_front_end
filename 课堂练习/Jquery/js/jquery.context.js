(function ($) {
    if (typeof $ == undefined) {
        throw new Error('jQuery is not defined');
    }
    $.fn.extend({
        addContextMenu: function (menuList) {
            let menUl = document.createElement('ul');
            menUl.classList.add('context_menu_box');
            for (let i = 0; i < menuList.length; i++) {
                const newLi = document.createElement('li');
                newLi.innerText = menuList[i].text;
                //判断是否有事件需要绑定
                if (typeof menuList[i].click == 'function') {
                    $(newLi).on('click', menuList[i].click);
                }
                // 添加li
                menUl.appendChild(newLi);
            }
            document.body.appendChild(menUl);

            //绑定右键菜单事件
            this.contextmenu(function (event) {
                event.preventDefault();
                let x = event.clientX;
                let y = event.clientY;
                $(menUl).css({
                    left: x + 'px',
                    top: y + 'px'
                }).slideDown("slow");
            });

            //点击自己之后，把自己隐藏起来
            $(menUl).click(function () {
                $(this).hide();
            });
        }
    });
})(jQuery);