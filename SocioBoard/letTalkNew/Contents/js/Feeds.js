﻿var feedajax = '';
var bindfeedsprofiles = '';
var updatingwallposts = '';
var feedsdataforfacebook = '';
var feedsdatafortwitter = '';
var feedprofilesforfacebook = '';
var feedprofilesfortwitter = '';
var instagramimagesforfeeds = '';
//  woosuite variables

var facebookwallposts = '';
var facebookscheduler = '';
var facebookfeeds = '';

var twittertweets = '';
var twitterscheduler = '';
var twitterfeeds = '';

var linkedinwallposts = '';
var linkedinscheduler = '';
var linkedinfeeds = '';

var tabdata = '';
var instagramidforlazyload = '';



function BindFeeds(network) {
    debugger;
    var checkbool = true;
    debugger;
    if (feedsdataforfacebook.indexOf('<div id=\"messagetaskable_') != -1 && network == "facebook") {
        checkbool = false;
    } else if (feedsdatafortwitter.indexOf('<div id=\"messagetaskable_') != -1 && network == "twitter") {
        checkbool = false;
    }

    if (checkbool) {
        feedajax = $.ajax
        ({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=bindFeeds&network=" + network,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            cache: true,
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }  
                //debugger;
                $("#inbox_msgs").html(msg);
                if (network == 'facebook') {
                    feedsdataforfacebook = msg;
                } else if (network == "twitter") {
                    feedsdatafortwitter = msg;
                }

              //  BindProfilesInFeedsTab(network);
                //     UpdatingWallPostfromFacebook();
            },
            error: function (errmsg) {
                alert(errmsg);
            }
        });

    } else if (feedsdataforfacebook.indexOf('<div id=\"messagetaskable_') != -1 && network == "facebook") {
        $("#inbox_msgs").html(feedsdataforfacebook);
        BindProfilesInFeedsTab("facebook");
    } else if (feedsdatafortwitter.indexOf('<div id=\"messagetaskable_') != -1 && network == "twitter") {
        $("#inbox_msgs").html(feedsdatafortwitter);
        BindProfilesInFeedsTab("twitter");
    }
}


function BindProfilesInFeedsTab(network) {
    var boolcheck = true;

    debugger;
 //   bindfeedsprofiles.abort();
    if (feedprofilesforfacebook.indexOf('<li><a id=\"greencheck_') != -1 && network == "facebook") {
        boolcheck = false;
    } else if (feedprofilesfortwitter.indexOf('<li><a id=\"greencheck_') != -1 && network == "twitter") {
        boolcheck = false;
    }
    if (boolcheck) {
        bindfeedsprofiles =
    $.ajax
        ({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=bindProfiles&network=" + network,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
            try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                $("#accordianprofiles").html(msg);
                if (network == "facebook") {
                    feedprofilesforfacebook = msg;
                } else if (network == "twitter") {
                    feedprofilesfortwitter = msg;
                }
            }
        });
    } else if (feedprofilesforfacebook.indexOf('<li><a id=\"greencheck_') != -1 && network == "facebook") {
        $("#accordianprofiles").html(feedprofilesforfacebook);
    } else if (feedprofilesfortwitter.indexOf('<li><a id=\"greencheck_') != -1 && network == "twitter") {
        $("#accordianprofiles").html(feedprofilesfortwitter);
    }

}

function UpdatingWallPostfromFacebook() {
    updatingwallposts = $.ajax({

        type: "POST",
        url: "../Feeds/AjaxFeeds.aspx?op=updatewallposts",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (msg) {
            try {
                if (msg.toString().contains("logout")) {
//                    alert("logout");
                    window.location = "../Default.aspx?hint=logout";
                    return false;
                }
            }
            catch (e) {
            }
            $("inbox_msgs").html(msg);

        }
    });
}

function showinsprof(id) {
    debugger;
    $("#instaAccounts").css('display', 'block');
    $(".b-modal").css('display', 'block');
    $.ajax({
        type: "POST",
        url: "../Feeds/AjaxFeeds.aspx?op=IntagramProfiles&mediaId=" + id,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (msg) {
            try {
                if (msg.toString().contains("logout")) {
//                    alert("logout");
                    window.location = "../Default.aspx?hint=logout";
                    return false;
                }
            }
            catch (e) {
            }
            //  alert(msg);
            $("#accountsins").html(msg);
            $("#instaAccounts").bPopup();
        }
    });
    // $.session('id', id);
}

function postLikeRequest(mediaid, IntagramId, accessToken) {
    debugger;
    // alert(mediaid);
    $.ajax({
        type: "POST",
        url: "../Feeds/AjaxFeeds.aspx?op=postLike&mediaId=" + mediaid + "InstagramId" + IntagramId + "access=" + accessToken,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (msg) {
            try {
                if (msg.toString().contains("logout")) {
//                    alert("logout");
                    window.location = "../Default.aspx?hint=logout";
                    return false;
                }
            }
            catch (e) {
            }
            //   alert(msg);
            $("#accountsins").html(msg);
            $("#instaAccounts").bPopup();
        }
    });
}


/******************************************ForWoosuite*******************************************************************/


function BindProfilesforNetwork(network) {


    try {
        $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=networkprofiles&network=" + network,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }

                if (network == "facebook") {
                    debugger;
                    var fblook = '';


                    fblook = '<li><div class="feedim pull-left"><img width="31" height="31" src="../Contents/img/blank_img.png" alt=""></div><div class="pull-left feedcontent"><a class="feednm" href="#">No Records Found</a> <span></span><p></p><a href="#" class="retweets"></a><span></span></div></li>'


                    if (msg.indexOf('No Records Found') != -1) {
                        debugger;
                        $("#facebookusersforfeeds").html(msg);
                        try {
                            $("#img_paneltab1").attr('src', "../Contents/img/admin/1.png");
                            $("#data_paneltab1").html(fblook);
                        } catch (e) {
                        }
                        try {
                            $("#img_paneltab2").attr('src', "../Contents/img/admin/1.png");
                            $("#data_paneltab2").html(fblook);
                        } catch (e) {
                        }
                        try {
                            $("#img_paneltab3").attr('src', "../Contents/img/admin/1.png");
                            $("#data_paneltab3").html(fblook);
                        } catch (e) {
                        }
                        try {
                            $("#title_paneltab1").html("WallPosts");
                        } catch (e) {
                        }

                        try {
                            $("#title_paneltab2").html("NewsFeeds");
                        } catch (e) {

                        }

                        try {
                            $("#title_paneltab3").html("Scheduled Messages");
                        } catch (e) {

                        }




                    } else {
                        $("#facebookusersforfeeds").html(msg);
                        if (msg.indexOf('facebookdetails(\'') != -1) {
                            try {
                                var start = msg.indexOf('facebookdetails(\'');
                                var last = msg.indexOf('\')');
                                var sub = msg.substring(start, last + 2);
                                var startid = sub.indexOf('(\'');
                                var lastid = sub.indexOf('\')');
                                eval(sub + "()");
                            } catch (e) {

                            }

                        }
                    }

                    /// facebook details ko call karna hai;
                } else if (network == "twitter") {
                    $("#twitterprofilesoffeed").html(msg);
                } else if (network == "linkedin") {
                    $("#linkedinprofilesforfeed").html(msg);
                } else if (network == "instagram") {
                    $("#instagramprofilesforfeed").html(msg);
                }
            }
        });
    } catch (e) {

    }
}



function BindTwitterInDiscovery() {
    try {
        debugger;
        $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=networkprofiles&network=twitter",
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                debugger;
                var msgg = msg.replace(/twitterdetails/g, "getFollowers");
                $("#twitterprofilesoffeed").html(msgg);

            }
        });
    } catch (e) {

    }
}





function getFollowers(id) {

    try {
        debugger;
        $("#inbox_msgs").html('<img src="../Contents/img/328.gif" />');

        $.ajax
        ({
            type: "GET",
            url: "../Helper/AjaxHelper.aspx?op=getFollowers&id=" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                debugger;

                $("#inbox_msgs").html(msg);

            }
        });






    } catch (e) {
        //  alert(e);
    }


}

/*bind facebook feeds on homepage*/

function facebookdetails(id) {
    debugger;
    try {

        $("#instag").load("../Layouts/feedstab.htm");

        debugger;
        try {
            $('#data_paneltab1 a.feedspopup').lightBox();

            //            $('#data_paneltab1 a.feedspopup').on('', '');




        } catch (e) {
            debugger;
        }


    } catch (e) {

    }

    try {
        debugger;
        try {
            $("#loader_tabpanel1").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab1").html("");

        try {
            $("#loader_tabpanel2").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab2").html("");


        try {
            $("#loader_tabpanel3").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab3").html("");

        try {
            twitterfeeds.abort();
        } catch (e) {

        }
        try {
            twitterscheduler.abort();
        } catch (e) {

        }
        try {
            twittertweets.abort();
        } catch (e) {

        }

        try {
            linkedinfeeds.abort();
        } catch (e) {

        }
        try {
            linkedinscheduler.abort();
        } catch (e) {

        }
        try {
            linkedinwallposts.abort();
        } catch (e) {

        }



        try {
            facebookwallposts.abort();
        } catch (e) {

        }

        try {
            facebookfeeds.abort();
        } catch (e) {

        }
        try {
            facebookscheduler.abort();
        } catch (e) {

        }


        facebookwallposts = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=facebookwallposts&load=first&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab1").attr('src', "../Contents/img/admin/1.png");
                } catch (e) {
                }
                try {
                    $("#loader_tabpanel1").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {
                }
                try {
                    $("#title_paneltab1").html("WallPosts");
                } catch (e) {
                }
                try {
                    $("#data_paneltab1").html(msg);
                } catch (e) {
                }
                try {
                    $("#data_paneltab1").mCustomScrollbar("update");
                } catch (e) {

                }
                //////////////////////////calling facebook Api for latestdata
                $.ajax({
                    type: "POST",
                    url: "../Feeds/AjaxFeeds.aspx?op=facebookapi&profileid=" + id,
                    data: '',
                    contentType: "application/json; charset=utf-8",
                    dataType: "html",
                    success: function (msg) {
                        try {
                            if (msg.toString().contains("logout")) {
//                                alert("logout");
                                window.location = "../Default.aspx?hint=logout";
                                return false;
                            }
                        }
                        catch (e) {
                        }
                        debugger;


                        $.ajax({
                            type: "POST",
                            url: "../Feeds/AjaxFeeds.aspx?op=facebookwallposts&load=first&profileid=" + id,
                            data: '',
                            contentType: "application/json; charset=utf-8",
                            dataType: "html",
                            success: function (msg) {
                                try {
                                    if (msg.toString().contains("logout")) {
//                                        alert("logout");
                                        window.location = "../Default.aspx?hint=logout";
                                        return false;
                                    }
                                }
                                catch (e) {
                                }
                                debugger;
                                try {
                                    facebookfeeds.load();
                                } catch (e) {

                                }
                                try {
                                    $("#img_paneltab1").attr('src', "../Contents/img/admin/1.png");
                                } catch (e) {
                                }
                                try {
                                    $("#loader_tabpanel1").attr('src', "../Contents/img/admin/9.png");
                                } catch (e) {
                                }
                                try {
                                    $("#title_paneltab1").html("WallPosts");
                                } catch (e) {
                                }
                                try {

                                    $("#data_paneltab1").html(msg);


                                    $("#data_paneltab1").on('scroll', facebookwallscrolldata);

                                } catch (e) {
                                }
                                try {
                                    $("#data_paneltab1").mCustomScrollbar("update");
                                } catch (e) {

                                }

                            }
                        });
                    }
                });

            }
        });

        //        try {
        //            var $container = $("#data_paneltab1");
        //            $("#data_paneltab1").lazyScrollLoading({
        //                onScrollToBottom: function (e, $lazyItems) {
        //                    debugger;
        //                    $.ajax({
        //                        type: "POST",
        //                        url: "../Feeds/AjaxFeeds.aspx?op=facebookwallposts&load=scroll",
        //                        data: '',
        //                        contentType: "application/json; charset=utf-8",
        //                        dataType: "html",
        //                        success: function (facemsg) {
        //                            debugger;
        //                            $("#data_paneltab1").append(facemsg);
        //                        }
        //                    });
        //                }
        //            });

        //        } catch (e) {

        //        }




        facebookfeeds = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=facebookfeeds&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab2").attr('src', "../Contents/img/admin/1.png");
                } catch (e) {
                }
                try {
                    $("#loader_tabpanel2").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab2").html("NewsFeeds");
                } catch (e) {

                }
                try {
                    $("#data_paneltab2").html(msg);
                } catch (e) {

                }

                try {
                    $("#data_paneltab2").mCustomScrollbar("update");
                } catch (e) {

                }
            }
        });









        facebookscheduler = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=scheduler&network=facebook&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab3").attr('src', "../Contents/img/admin/1.png");
                } catch (e) {

                }


                try {
                    $("#loader_tabpanel3").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab3").html("Scheduled Messages");
                } catch (e) {

                }
                try {
                    $("#data_paneltab3").html(msg);
                } catch (e) {

                }
                try {
                    $("#data_paneltab3").mCustomScrollbar("update");
                } catch (e) {

                }

            }
        });

    } catch (e) {

    }
}


function facebookwallscrolldata() {
    debugger;
    try {
        $("#data_paneltab1").off('scroll', facebookwallscrolldata);

        var $container = $("#data_paneltab1");
        //                    $("#data_paneltab1").lazyScrollLoading({
        //                        onScrollToBottom: function (e, $lazyItems) {
        //                            debugger;
        $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=facebookwallposts&load=scroll",
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (facemsg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                debugger;
                $("#data_paneltab1").on('scroll', facebookwallscrolldata);
                $("#data_paneltab1").append(facemsg);
            }
        });
        //                        }
        //                    });

    } catch (e) {

    }


}


/*************Twitter****************/


function twitterdetails(id) {
    try {
        debugger;
        $("#instag").load("../Layouts/feedstab.htm");
    } catch (e) {

    }
    try {

        try {
            $("#loader_tabpanel1").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab1").html("");
        try {
            $("#loader_tabpanel3").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab3").html("");

        try {
            $("#loader_tabpanel2").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab2").html("");


        try {
            twitterfeeds.abort();
        } catch (e) {

        }
        try {
            twitterscheduler.abort();
        } catch (e) {

        }
        try {
            twittertweets.abort();
        } catch (e) {

        }


        try {
            linkedinfeeds.abort();
        } catch (e) {

        }
        try {
            linkedinscheduler.abort();
        } catch (e) {

        }
        try {
            linkedinwallposts.abort();
        } catch (e) {

        }



        try {
            facebookwallposts.abort();
        } catch (e) {

        }

        try {
            facebookfeeds.abort();
        } catch (e) {

        }
        try {
            facebookscheduler.abort();
        } catch (e) {

        }

        twittertweets = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=twitternetworkdetails&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
//                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab1").attr('src', "../Contents/img/admin/6.png");
                } catch (e) {

                }


                try {
                    $("#loader_tabpanel1").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab1").html("Feeds");
                } catch (e) {

                }
                try {
                    $("#data_paneltab1").html(msg);
                } catch (e) {

                }
                try {
                    $("#data_paneltab1").mCustomScrollbar("update");
                } catch (e) {

                }

                $.ajax({
                    type: "POST",
                    url: "../Feeds/AjaxFeeds.aspx?op=twitterapi&profileid=" + id,
                    data: '',
                    contentType: "application/json; charset=utf-8",
                    dataType: "html",
                    success: function (msg) {
                        try {
                            if (msg.toString().contains("logout")) {
//                                alert("logout");
                                window.location = "../Default.aspx?hint=logout";
                                return false;
                            }
                        }
                        catch (e) {
                        }
                        $.ajax({
                            type: "POST",
                            url: "../Feeds/AjaxFeeds.aspx?op=twitternetworkdetails&profileid=" + id,
                            data: '',
                            contentType: "application/json; charset=utf-8",
                            dataType: "html",
                            success: function (msg) {
                                try {
                                    if (msg.toString().contains("logout")) {
//                                        alert("logout");
                                        window.location = "../Default.aspx?hint=logout";
                                        return false;
                                    }
                                }
                                catch (e) {
                                }
                                try {
                                    $("#img_paneltab1").attr('src', "../Contents/img/admin/6.png");
                                } catch (e) {



                                }


                                try {
                                    $("#loader_tabpanel1").attr('src', "../Contents/img/admin/9.png");
                                } catch (e) {

                                }
                                try {
                                    $("#title_paneltab1").html("Feeds");
                                } catch (e) {

                                }
                                try {
                                    $("#data_paneltab1").html(msg);
                                } catch (e) {

                                }
                                try {
                                    $("#data_paneltab1").mCustomScrollbar("update");
                                } catch (e) {

                                }
                            }
                        });




                    }
                });

            }
        });



        twitterfeeds = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=scheduler&network=twitter&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab3").attr('src', "../Contents/img/admin/6.png");
                } catch (e) {
                }
                try {
                    $("#loader_tabpanel3").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab3").html("Scheduler");
                } catch (e) {

                }
                try {
                    $("#data_paneltab3").html(msg);
                } catch (e) {

                }
                try {
                    $("#data_paneltab3").mCustomScrollbar("update");
                } catch (e) {

                }


            }
        });




        twitterscheduler = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=twitterfeeds&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab2").attr('src', "../Contents/img/admin/6.png");
                } catch (e) {
                }
                try {
                    $("#loader_tabpanel2").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab2").html("Tweets");
                } catch (e) {

                }
                try {
                    $("#data_paneltab2").html(msg);
                } catch (e) {

                }
                try {
                    $("#data_paneltab2").mCustomScrollbar("update");
                } catch (e) {

                }
            }
        });



    } catch (e) {

    }

}




function linkedindetails(id) {
    debugger;
    try {
        $("#instag").load("../Layouts/feedstab.htm");

    } catch (e) {

    }

    try {
        debugger;
        try {
            $("#loader_tabpanel1").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab1").html("");

        try {
            $("#loader_tabpanel2").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab2").html("");


        try {
            $("#loader_tabpanel3").attr('src', '../Contents/img/891.png');
        } catch (e) {

        }
        $("#data_paneltab3").html("");

        try {
            linkedinscheduler.abort();
        } catch (e) {

        }
        try {
            linkedinwallposts.abort();
        } catch (e) {

        }
        try {
            linkedinscheduler.abort();
        } catch (e) {

        }
        try {
            twitterfeeds.abort();
        } catch (e) {

        }
        try {
            twitterscheduler.abort();
        } catch (e) {

        }
        try {
            twittertweets.abort();
        } catch (e) {

        }
        try {
            facebookwallposts.abort();
        } catch (e) {

        }

        try {
            facebookfeeds.abort();
        } catch (e) {

        }
        try {
            facebookscheduler.abort();
        } catch (e) {

        }

        linkedinwallposts = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=linkedinwallposts&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab1").attr('src', "../Contents/img/admin/5.png");
                } catch (e) {



                }


                try {
                    $("#loader_tabpanel1").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab1").html("Network Updates");
                } catch (e) {

                }
                try {
                    $("#data_paneltab1").html(msg);
                } catch (e) {

                }


            }
        });

        linkedinfeeds = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=linkedinfeeds&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab2").attr('src', "../Contents/img/admin/5.png");
                } catch (e) {

                }


                try {
                    $("#loader_tabpanel2").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab2").html("User Updates");
                } catch (e) {

                }
                try {
                    $("#data_paneltab2").html(msg);
                } catch (e) {

                }

            }
        });





        linkedinscheduler = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=scheduler&network=linkedin&profileid=" + id,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                try {
                    $("#img_paneltab3").attr('src', "../Contents/img/admin/5.png");
                } catch (e) {



                }


                try {
                    $("#loader_tabpanel3").attr('src', "../Contents/img/admin/9.png");
                } catch (e) {

                }
                try {
                    $("#title_paneltab3").html("Scheduled Messages");
                } catch (e) {

                }
                try {
                    $("#data_paneltab3").html(msg);
                } catch (e) {

                }


            }
        });

    } catch (e) {

    }
}






/******************************************instagram********************/
function likesupdate(imgid, access, userid, chk) {
    debugger;

    try {

        if (chk == 'like') {
            $.ajax({
                type: "POST",
                url: "../Feeds/AjaxFeeds.aspx?mediaid=" + imgid + "&op=instagramlike&access=" + access + "&userid=" + userid,
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                success: function (msg) {
                    try {
                        if (msg.toString().contains("logout")) {
                            alert("logout");
                            window.location = "../Default.aspx?hint=logout";
                            return false;
                        }
                    }
                    catch (e) {
                    }
                    debugger;
                    $("#heartEmpty_" + imgid).attr('src', '../Contents/img/admin/heart-empty_pink.png');
                    $("#instaAccounts").css('display', 'none');
                    $(".b-modal").css('display', 'none');

                }
            });
        } else if (chk == 'unlike') {
            $.ajax({
                type: "POST",
                url: "../Feeds/AjaxFeeds.aspx?mediaid=" + imgid + "&op=instagramunlike&access=" + access + "&userid=" + userid,
                data: "",
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                success: function (msg) {
                    try {
                        if (msg.toString().contains("logout")) {
                            alert("logout");
                            window.location = "../Default.aspx?hint=logout";
                            return false;
                        }
                    }
                    catch (e) {
                    }
                    debugger;
                    $("#instaAccounts").css('display', 'none');
                    $(".b-modal").css('display', 'none');
                }
            });

        }
    } catch (e) {
        //  //alert(e);
    }

}


function Instagramdetails(id) {
    debugger;
    try {

    } catch (e) {

    }

    try {
        $("#instag").html("<img src='../Contents/img/43px_on_transparent1.gif' alt='' style='margin-left:400px;; height: 55px; width: 43px;' />");
    } catch (e) {

    }
    try {
        linkedinscheduler.abort();
    } catch (e) {

    }
    try {
        linkedinwallposts.abort();
    } catch (e) {

    }
    try {
        linkedinscheduler.abort();
    } catch (e) {

    }
    try {
        twitterfeeds.abort();
    } catch (e) {

    }
    try {
        twitterscheduler.abort();
    } catch (e) {

    }
    try {
        twittertweets.abort();
    } catch (e) {

    }
    try {
        facebookwallposts.abort();
    } catch (e) {

    }

    try {
        facebookfeeds.abort();
    } catch (e) {

    }
    try {
        facebookscheduler.abort();
    } catch (e) {

    }

    try {
        instagramimagesforfeeds.abort();
    } catch (e) {

    }
    instagramidforlazyload = id;
    $.ajax({
        type: "POST",
        url: "../Feeds/AjaxFeeds.aspx?op=instagramimages&loadtime=first&profileid=" + id,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (msg) {
            try {
                if (msg.toString().contains("logout")) {
                    alert("logout");
                    window.location = "../Default.aspx?hint=logout";
                    return false;
                }
            }
            catch (e) {
            }
            $("#instag").html(msg);

            $.ajax({
                type: "POST",
                url: "../Feeds/AjaxFeeds.aspx?op=instagramApi&profileid=" + id,
                data: '',
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                success: function (data) {
                    try {
                        if (msg.toString().contains("logout")) {
                            alert("logout");
                            window.location = "../Default.aspx?hint=logout";
                            return false;
                        }
                    }
                    catch (e) {
                    }
                }
            });
            $(document).on('scroll', instagramimages);


        }
    });

}


function instagramimages() {

    debugger;
    $(document).off('scroll', instagramimages);
    $.ajax({
        type: "POST",
        url: "../Feeds/AjaxFeeds.aspx?op=instagramimages&loadtime=nofirst&profileid=" + instagramidforlazyload,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "html",
        success: function (msg) {
            try {
                if (msg.toString().contains("logout")) {
                    alert("logout");
                    window.location = "../Default.aspx?hint=logout";
                    return false;
                }
            }
            catch (e) {
            }
            $("#instag").append(msg);
            $(document).on('scroll', instagramimages);
        }
    });
}



function fbimage(src) {
    debugger;

    if (src.indexOf('_s.png') != -1) {
        var newsrc = src.replace('_s.png', '_n.png');
        $("#popupimage").attr('src', newsrc);
    } else if (src.indexOf('_s.jpg') != -1) {
        var newsrcP = src.replace('_s.jpg', '_n.jpg');
        $("#popupimage").attr('src', newsrcP);
    } else {
        $("#popupimage").attr('src', src);
    }
    $("#facebookImagePopup").bPopup({

        positionStyle: 'fixed'

    });

}

function insUser(imgid, access) {
    debugger;
    $.ajax({
        type: "POST",
        url: "../Feeds/AjaxFeeds.aspx?op=instagramuserpopup",
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            try {
                if (msg.toString().contains("logout")) {
                    alert("logout");
                    window.location = "../Default.aspx?hint=logout";
                    return false;
                }
            }
            catch (e) {
            }
            debugger;
            var strUser = '';
            strUser += "<div class=\"select_user\">Select User</div><ul>";
            for (var item in msg) {
                strUser += "<li><input type=\"radio\" class=\"radio\" onclick=\"likesupdate('" + imgid + "','" + msg[item].AccessToken + "','" + msg[item].InstagramId + "','like');\"> <div class=\"user_name\">" + msg[item].InsUserName + "</div></li>";
            }
            strUser += "</ul>";
            $('#divinsuser').html(strUser);
            $('#likesuser').bPopup();
        }
    });
   
} 

function fbimageclose() {
    
    $("#popupimage").attr('src', "../Contents/img/43px_on_transparent.gif");

}


function getFBUserForFeeds() {
    $.ajax({

        type: 'POST',
        url: '../AjaxHome.aspx?op=getFbUsersForHome',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            try {
                if (msg.toString().contains("logout")) {
                    alert("logout");
                    window.location = "../Default.aspx?hint=logout";
                    return false;
                }
            }
            catch (e) {
            }
            debugger;

            var datanew = data.replace(/getUserDetailsforHome/g, "getFeedUserDetails");

            $("#fbUserMid").html(datanew);

            try {
                var id = $("#fbUserMid li:first").attr('id');
                var net = id.split('_');
                getFeedUserDetails(net[1],net[0]);

            } catch (e) {
                //alert(e);
                //  $("#recentmsgs_fb").html('');
            }
        }

    });

}

function getFeedUserDetails(userid, network) {
    debugger;
    //alert(userid);
    //alert(network);
    if (network == 'fb') {
        var fbhome = '';
        var fbfeed = '';

        try {
            fbhome.abort();
        } catch (e) {

        }

        try {
            fbfeed.abort();
        } catch (e) {

        }
        fbhome = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=facebookwallposts&load=first&profileid=" + userid,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }

                //alert('first time');
                //alert(msg);
                $("#fbHome").html(msg);

                $.ajax({
                    type: "POST",
                    url: "../Feeds/AjaxFeeds.aspx?op=facebookapi&profileid=" + id,
                    data: '',
                    contentType: "application/json; charset=utf-8",
                    dataType: "html",
                    success: function (msg2) {
                        try {
                            if (msg.toString().contains("logout")) {
                                alert("logout");
                                window.location = "../Default.aspx?hint=logout";
                                return false;
                            }
                        }
                        catch (e) {
                        }
                        alet(msg2);


                        $.ajax({
                            type: "POST",
                            url: "../Feeds/AjaxFeeds.aspx?op=facebookwallposts&load=first&profileid=" + userid,
                            data: '',
                            contentType: "application/json; charset=utf-8",
                            dataType: "html",
                            success: function (msg1) {
                                try {
                                    if (msg1.toString().contains("logout")) {
                                        alert("logout");
                                        window.location = "../Default.aspx?hint=logout";
                                        return false;
                                    }
                                }
                                catch (e) {
                                }
                                //alert(msg1);
                                $("#fbHome").html(msg1);
                            }
                        });
                    }
                });
            }
        });

        fbfeed = $.ajax({
            type: "POST",
            url: "../Feeds/AjaxFeeds.aspx?op=facebookfeeds&profileid=" + userid,
            data: '',
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (msg) {
                try {
                    if (msg.toString().contains("logout")) {
                        alert("logout");
                        window.location = "../Default.aspx?hint=logout";
                        return false;
                    }
                }
                catch (e) {
                }
                $("#fbFeed").html(msg);

                //abhay scheduledmessage start
                
                fbfeed = $.ajax({
                    type: "POST",
                    url: "../Feeds/AjaxFeeds.aspx?op=scheduler&network=facebook&profileid=" + userid,
                    data: '',
                    contentType: "application/json; charset=utf-8",
                    dataType: "html",
                    success: function (msg) {
                        try {
                            if (msg.toString().contains("logout")) {
                                alert("logout");
                                window.location = "../Default.aspx?hint=logout";
                                return false;
                            }
                        }
                        catch (e) {
                        }
                       // alert('abhay');
                        //alert(msg);
                        $("#scheduled").html(msg);
                    }
                });
                //abhay scheduledmessage end
            }
        });


    } 
    else if (network == 'twt') {
    alert('tetter');
    } 
    else if (network == 'lin') {
        alert('lin');
    } 
    else if (network == 'gplus') {
        alert('gplus');
    }

}