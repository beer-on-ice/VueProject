import {toDB} from './formatTime'
export default function playStyle() {
    // 双击的歌曲样式变化
    $('#infoList_search tr').find("td.index").each(function(index,item) {
        $(item).removeClass("active").html(toDB(index+1));
    });
    $('tr.active').find("td.index").html('<i class="fa fa-volume-up" aria-hidden="true"></i>').addClass("active");
}
