<template>
    <!-- page_main 歌单：我喜欢的音乐 -->
	<div class="page_main R_page" id="pageMain">
		<div class="main_container">
			<div class="listcontainer">
                <!-- listinfo -->
				<div class="listinfo clearfix">
					<div class="info_listpic">
						<img src="../common/images/temp_pic001.jpg" alt="" id="playlist_listPic" />
					</div>
					<div class="info_detailtext">
						<div class="playinfo">
							<span><i class="fa fa-music" aria-hidden="true"></i>&nbsp;&nbsp;<span id="playlist_trackCount">0</span></span>
							<span><i class="fa fa-play-circle-o" aria-hidden="true"></i>&nbsp;&nbsp;<span id="playlist_playCount">0</span></span>
						</div>
						<div class="detail_name">
							<span class="listtag">歌单</span>
							<span class="listname" id="playlist_listName">孤独的键</span>
						</div>
						<div class="detail_time">
							<span class="userpic"><a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" id="playlist_userFace" /></a></span>
							<span class="username"><a href="javascript:void(0);" id="playlist_userName">孤独的箭</a></span>
							<span class="createtime" id="playlist_createTime">1995-10-01</span>
							<span>创建</span>
						</div>
						<div class="detail_btns">
							<span class="btn playall"><i class="fa fa-play-circle-o" aria-hidden="true" style="color:#c52f30;"></i>&nbsp;&nbsp;播放全部</span><!--
							--><span class="btn plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
							<span class="btn playall"><i class="fa fa-folder" aria-hidden="true"></i>&nbsp;&nbsp;收藏(0)</span>
							<span class="btn playall"><i class="fa fa-share-square-o" aria-hidden="true"></i>&nbsp;&nbsp;分享(0)</span>
							<span class="btn playall"><i class="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;下载全部</span>
						</div>
					</div>
				</div>

                <!-- listtab -->
                <div class="listtab">
                    <div class="tabbtns clearfix">
						<label class="label_btn active" for="music">歌单列表</label>
						<label class="label_btn" for="comment">评论(0)</label>
						<label class="label_btn" for="follower">收藏者</label>
						<div class="menu_search">
							<input type="text" placeholder="搜索歌单音乐" class="search_inp" />
							<span class="search_btn"><i class="fa fa-search" aria-hidden="true"></i></span>
						</div>
					</div>
                    <!-- musiclist -->
                    <input type="radio" id="music" name="tablist" checked="" />
                    <div class="tabitem musiclist">
                        <table>
                            <thead>
                                <tr>
                                    <th>&nbsp;&nbsp;</th>
                                    <th>操作</th>
                                    <th>音乐标题</th>
                                    <th>歌手</th>
                                    <th>专辑</th>
                                    <th>时长</th>
                                </tr>
                            </thead>
                            <tbody class="infolist" id="infoList_playlist">
                                <tr data-musicid="407839677">
                                    <td class="index" data-num="01">01</td>
                                    <td><i class="fa fa-heart-o addMylove" aria-hidden="true"></i>&nbsp;
                        <i class="fa fa-download" aria-hidden="true"></i></td>
                                    <td>HandClap</td>
                                    <td>Fitz &amp; the Tantrums</td>
                                    <td>Fitz &amp; the Tantrums</td>
                                    <td>03:13</td>
                                    <td style="display:none">http://p1.music.126.net/SVMVN3UZpDQ3AL57nTZSNg==/18209012067816536.jpg</td>
                                </tr>
                                <tr data-musicid="26584442">
                                    <td class="index" data-num="01">02</td>
                                    <td><i class="fa fa-heart-o addMylove" aria-hidden="true"></i>&nbsp;
                        <i class="fa fa-download" aria-hidden="true"></i></td>
                                    <td>风的季节</td>
                                    <td>Soler</td>
                                    <td>历久尝新</td>
                                    <td>04:09</td>
                                    <td style="display:none">http://p1.music.126.net/-eqaVo-47yPxQ-RVz3wwcA==/4439827952969202.jpg</td>
                                </tr>
                            </tbody>
                            </tfoot>
                        </table>
                    </div>

                    <!-- comments -->
                    <input type="radio" id="comment" name="tablist" />
                    <div class="tabitem commentlist">
                        <div class="commentbox clearfix">
                            <textarea name="" id="" cols="30" rows="10" maxlength="140"></textarea>
                            <span class="wordslen">140</span>
                            <a href="javascript:void(0);" class="btn emoji"><i class="fa fa-smile-o" aria-hidden="true"></i></a>
                            <a href="javascript:void(0);" class="btn at"><i class="fa fa-at" aria-hidden="true"></i></a>
                            <a href="javascript:void(0);" class="btn comment">评论</a>
                        </div>
                        <div class="commenttable">
                            <div class="comment new">
                                <div class="title">最新评论(0)</div>
                                <div class="content">
                                    <p><span class="username"><a href="javascript:void(0);">用户008</a></span>：<span class="usersay">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, earum cupiditate facere suscipit tenetur quia ab quasi ea eligendi, neque esse quidem. Eius, quasi! Odit veniam repellat amet, accusamus voluptatem.</span></p>
                                    <div class="btngroups clearfix">
                                        <span class="time">2016年12月31日 10:35:06</span>
                                        <span class="btn">
                                            <a href="javascript:void(0);" class="btn_report">举报</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_support"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>(0)</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_share">分享</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_reply">回复</a>
                                        </span>
                                    </div>
                                    <div class="userface"><a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a></div>
                                </div>
                                <div class="content">
                                    <p><span class="username"><a href="javascript:void(0);">用户008</a></span>：<span class="usersay">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span></p>
                                    <div class="btngroups clearfix">
                                        <span class="time">2016年12月31日 10:35:06</span>
                                        <span class="btn">
                                            <a href="javascript:void(0);" class="btn_report">举报</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_support"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>(0)</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_share">分享</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <a href="javascript:void(0);" class="btn_reply">回复</a>
                                        </span>
                                    </div>
                                    <div class="userface"><a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a></div>
                                </div>
                            </div>
                            <div class="comment prefect">
                                <div class="title">精彩评论(0)</div>
                                <div class="content">
                                    <p style="color:#ccc;">-- 暂无评论 --</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- followers -->
                    <input type="radio" id="follower" name="tablist" />
                    <div class="tabitem followerlist">
                        <figure>
                            <a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a>
                            <figcaption><a href="javascript:void(0);">-USERNAME-</a></figcaption>
                        </figure>
                        <figure>
                            <a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a>
                            <figcaption><a href="javascript:void(0);">-USERNAME-</a></figcaption>
                        </figure>
                        <figure>
                            <a href="javascript:void(0);"><img src="../common/images/user_face.png" alt="" /></a>
                            <figcaption><a href="javascript:void(0);">-USERNAME-</a></figcaption>
                        </figure>
                    </div>
                </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="css">
/* ------------------------R_page page_right------------------------------- */
.R_page{
    padding:60px 0 60px 220px;
    height:100%;
    box-sizing:border-box;
}
.R_page>.main_container{
    height:100%;
    overflow-y:scroll;
}
.listcontainer{
    width:100%;
    overflow:hidden;
}
/* listinfo s */
.listcontainer>.listinfo{
    padding:20px 40px;
    margin-bottom:30px;
}
.listcontainer>.listinfo>.info_listpic{
    float:left;
    width:200px;
    margin-right:40px;
    position:relative;
}
.listcontainer>.listinfo>.info_listpic>img{
    width:100%;
    height:auto;
}
.listcontainer>.listinfo>.info_detailtext{
    float:left;
    width:calc(100% - 200px - 40px);
    position:relative;
}
.listcontainer>.listinfo>.info_detailtext>.playinfo{
    position:absolute;
    top:0;right:0;
}
.listcontainer>.listinfo>.info_detailtext>.playinfo>span{
    margin:0 5px;
    color:#646464;
}
.listcontainer>.listinfo>.info_detailtext>.detail_name>.listtag{
    display:inline-block;
    padding:5px 10px;
    background-color:#c52f30;
    color:#f1f1f1;
}
.listcontainer>.listinfo>.info_detailtext>.detail_name>.listname{
    margin:0 5px;
    font-size:1rem;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time{
    margin:15px 0;
    padding-left:50px;
    position:relative;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time>span{
    margin:0 5px;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time>.userpic{
    display:inline-block;
    position:absolute;
    top:50%;left:0;
    width:30px;
    height:30px;
    border:1px solid #dadadc;
    border-radius:50%;
    -webkit-transform:translate(0,-50%);
    transform:translate(0,-50%);
    overflow:hidden;
}
.listcontainer>.listinfo>.info_detailtext>.detail_time>.userpic>a>img{
    width:100%;
    height:auto;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn{
    display:inline-block;
    margin:0 5px;
    padding:5px 10px;
    border:1px solid #dadadc;
    border-radius:5px;
    cursor:pointer;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn.playall{
    margin-right:0;
    border-top-right-radius:0;
    border-bottom-right-radius:0;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn.plus{
    margin-left:0;
    border-left:none;
    border-top-left-radius:0;
    border-bottom-left-radius:0;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn:hover{
    background-color:#f5f5f7;
}
.listcontainer>.listinfo>.info_detailtext>.detail_btns>.btn>.fa{
    font-size:0.8rem;
}
    /*listinfo e*/
    /* listtab s */
.listcontainer>.listtab>.tabbtns{
	padding:0 40px;
	border-bottom:1px solid #c52f30;
}
.listcontainer>.listtab>.tabbtns>label{
	display:inline-block;
	padding:0.5em 2em;
	margin:0 3px;
	border:1px solid #dadadc;
	border-bottom:none;
	cursor:pointer;
}
.listcontainer>.listtab>.tabbtns>label:hover{
	background-color:#e3e3e5;
}
.listcontainer>.listtab>.tabbtns>label.active{
	background-color:#c52f30;
	color:#f1f1f1;
	border-color:#c52f30;
}
.listcontainer>.listtab>.tabbtns>.menu_search{
	float:right;
    position:relative;
}
.listcontainer>.listtab>.tabbtns>.menu_search>.search_inp{
	background-color:#fff;
	color:#666;
	border:1px solid #dadadc;
    display:inline-block;
	outline:none;
	width:160px;
	padding:5px 30px 5px 10px;
	border-radius:10px;
}
.listcontainer>.listtab>.tabbtns>.menu_search>.search_btn {
    position: absolute;
    top: 50%;
    right: 10px;
    -webkit-transform: translate(0,-50%);
    transform: translate(0,-50%);
    cursor: pointer;
}
.listcontainer>.listtab>.tabbtns>.menu_search>.search_btn>.fa {
    font-size: 0.7rem;
    color: #ccc;
}
.listcontainer>.listtab>.tabitem{
	display:none;
}
.listcontainer>.listtab>input{
	position:fixed;
	top:0;
    left:-9999px;
}
.listcontainer>.listtab>input:checked + .tabitem{
	display:block;
}
/* listtab e */

/*comments s*/
.commentlist{
	padding:15px 40px;
}
.commentlist>.commentbox{
	width:100%;
	padding:10px 10px 15px 10px;
	background-color:#f0f0f2;
	position:relative;
}
.commentlist>.commentbox>textarea{
	margin-bottom:10px;
	padding:5px 10px;
	width:100%;
	height:80px;
	resize:none;
	outline:none;
	border:1px solid #e3e3e5;
	background-color:#fff;
	box-sizing:border-box;
}
.commentlist>.commentbox>.wordslen{
	position:absolute;
	top:66px;right:15px;
	color:#8b8b86;
}
.commentlist>.commentbox>.btn.comment{
	float:right;
	display:inline-block;
	padding:5px 10px;
	border:1px solid #e3e3e5;
	border-radius:5px;
	background-color:#fdfdfd;
}
.commentlist>.commentbox>.btn.emoji,
.commentlist>.commentbox>.btn.at{
	float:left;
	margin-right:10px;
	font-size:1rem;
}
.commentlist>.commenttable{
	margin:30px 0;
}
.commentlist>.commenttable>.comment>.title{
	margin:10px 0;
	font-size:0.8rem;
	color:#a5a4a9;
}
.commentlist>.commenttable>.comment>.content{
	padding:1em 0 1em 60px;
	border-top:1px solid #eee;
	position:relative;
}
.commentlist>.commenttable>.comment>.content>.userface{
	position:absolute;
	top:1em;left:0;
	width:40px;
	height:40px;
}
.commentlist>.commenttable>.comment>.content>.userface>a>img{
	width:100%;
	height:auto;
}
.commentlist>.commenttable>.comment>.content>p{
	margin-bottom:1em;
}
.commentlist>.commenttable>.comment>.content>p>.username>a{
	color:#0b75c3;
}
.commentlist>.commenttable>.comment>.content>p>.usersay{
	color:#343434;
}
.commentlist>.commenttable>.comment>.content>.btngroups>.time{
	float:left;
	color:#939393;
}
.commentlist>.commenttable>.comment>.content>.btngroups>.btn{
	float:right;
}
/*comments e*/

/*followers s*/
.followerlist{
	padding:20px 50px;
}
.followerlist>figure{
	display:inline-block;
	width:80px;
	margin:10px 20px;
	text-align:center;
}
.followerlist>figure>a>img{
	display:inline-block;
	width:60px;
	height:60px;
	border-radius:50%;
}
.followerlist>figure>figcaption{
	width:100%;
	white-space:nowrap;
	text-overflow:ellipsis;
	font-size:0.6rem;
	overflow:hidden;
}
/*followers e*/
</style>
