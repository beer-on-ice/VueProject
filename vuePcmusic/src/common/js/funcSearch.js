// 搜索歌曲功能函数

export function funcSearch() {
    // 显示搜索页 隐藏列表页
    $("#pageMain").slideUp(300);
    $("#pageSearch").slideDown(300);
    // 缩放歌曲详情页
    $("#pageSongDetail").css({
        "top":"100%",
        "right":"100%",
        "opacity":0
    });
};


export function funcMain() {
    // 显示搜索页 隐藏列表页
    $("#pageSearch").slideUp(300);
    $("#pageMain").slideDown(300);
}
