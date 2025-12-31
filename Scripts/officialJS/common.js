// udesk
(function (a, h, c, b, f, g) {
    a["UdeskApiObject"] = f;
    a[f] =
        a[f] ||
        function () {
            (a[f].d = a[f].d || []).push(arguments);
        };
    g = h.createElement(c);
    g.async = 1;
    g.charset = "utf-8";
    g.src = b;
    c = h.getElementsByTagName(c)[0];
    c.parentNode.insertBefore(g, c);
});
//    (
//    window,
//    document,
//    "script",
//    "https://assets-cli.s4.udesk.cn/im_client/js/udeskApi.js",
//    "ud"
//);
//ud({
//    code: "21d4h393",
//    link: "https://rundekf.s4.udesk.cn/im_client/?web_plugin_id=64631",
//    selector: ".selector",
//})

var app = new Vue({
    el: "#app",
    data: {
        eduVal: ["本科及以上", "大专", "高中/中专", "初中及以下"],
        majorVal: [
            "药学类",
            "中药学类",
            "护理",
            "制药工程",
            "生物技术",
            "化学",
            "临床医学",
            "口腔",
            "中药制药",
            "其他医药类",
        ],
        yearVal: ["1年以内", "2-3年", "4-5年", "5年以上"],
        subValue: [
            "执业西药师全科",
            "药学专业知识一",
            "药学专业知识二",
            "药学综合知识与技能",
            "执业中药师全科",
            "中药学专业知识一",
            "中药学专业知识二",
            "中药学综合知识与技能",
            "药事管理与法规",
        ],
        reg: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
        formData: {
            userName: "",
            userPhone: "",
            education: "",
            major: "",
            byear: "",
            project: "",
        },
    },
    mounted() {
        let that = this;
        window.onOK = function () {
            // 留言成功的回调
            that.formData = {
                userName: "",
                userPhone: "",
                education: "",
                major: "",
                byear: "",
                project: "",
            };
            success();
        };
        window.onError = function () {
            // 留言失败的回调
            tips("提交失败，请联系在线老师!");
        };
    },
    methods: {
        submit(formID) {
            var formType = "表单类型：执业药师报考条件-" + formID;
            var others = {
                education: this.formData.education,
                major: this.formData.major,
                customerFieldMap: {
                    毕业年限: this.formData.byear,
                    考试科目: this.formData.project,
                },
            };
            if (this.formData.userPhone.trim() == "") {
                tips("手机号不能为空！");
            } else if (!this.reg.test(this.formData.userPhone)) {
                tips("请检查手机号码是否正确！");
            } else {
                $.ajax({
                    url: "https://gateway3.rundejy.com/popularize/prom/form/data/collect/add",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        name: "客户",
                        phone: this.formData.userPhone,
                        remark: formType + JSON.stringify(others),
                        sourceUrl: window.location.href,
                    }),
                    success: function (res) {
                        if (res.success) {
                            onOK();
                        }
                    },
                    error: function (err) {
                        if (!err.success) {
                            // error(err.msg);
                        }
                    },
                });
                // sendPage(this.formData.userPhone, "客户", formType, others);
                window.sessionStorage.setItem("submitCount", 1);
            }
        },
        submit2(formID) {
            var formType = "表单类型：执业药师报考条件-" + formID;
            var others = {
                customerFieldMap: {
                    考试科目: this.formData.project,
                },
            };
            // 剔除该表单不包含的属性
            for (var key in others) {
                if (others[key] == "") {
                    delete others[key];
                }
            }
            if (this.formData.userName.trim() == "") {
                tips("姓名不能为空！");
            } else if (this.formData.userPhone.trim() == "") {
                tips("手机号不能为空！");
            } else if (!this.reg.test(this.formData.userPhone)) {
                tips("请检查手机号码是否正确！");
            } else {
                $.ajax({
                    url: "https://gateway3.rundejy.com/popularize/prom/form/data/collect/add",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        name: this.formData.userName,
                        phone: this.formData.userPhone,
                        remark: formType + JSON.stringify(others),
                        sourceUrl: window.location.href,
                    }),
                    success: function (res) {
                        if (res.success) {
                            onOK();
                        }
                    },
                    error: function (err) {
                        if (!err.success) {
                            // error(err.msg);
                        }
                    },
                });
                // sendPage(
                //   this.formData.userPhone,
                //   this.formData.userName,
                //   formType,
                //   others
                // );
                window.sessionStorage.setItem("submitCount", 1);
            }
        },
    },
});

// 页面效果
$(function () {
    /********* 自动添加螳螂链接 *********/
    $("a").each(function () {
        //遍历页面上所有a链接，选出href属性为空的链接
        var flag = $(this).attr("href").trim();
        if (!flag) {
            // 阻止a链接的默认行为
            $(this).attr("href", "javascript:;");
            $(this).addClass("selector");
            // 获取按钮说明
            // var aData = $(this).data("info");
            // var aText = $(this).text().replace(/\s+/g, "");
            // var mantis = "mantis.requestChat()";
            // if (aData) {
            //   mantis = "mantis.requestChat('" + aData + "')";
            // } else if (aText) {
            //   mantis = "mantis.requestChat('" + aText + "')";
            // }
            // $(this).attr("onclick", mantis);
        }
    });

    // 页面导航
    navFixed();
    toggleTab();
    var flag = true; // 互斥锁
    function navFixed() {
        if ($(document).scrollTop() >= 60) {
            $(".headerBox").addClass("fixed");
        } else {
            $(".headerBox").removeClass("fixed");
        }
    }
    // 导航切换
    function toggleTab() {
        $(".stamp").each(function (i, e) {
            if ($(document).scrollTop() >= $(e).offset().top - 300) {
                $(".navBox li").eq(i).addClass("on").siblings().removeClass();
            }
            if ($(document).scrollTop() <= 400) {
                $(".navBox li").removeClass();
            }
        });
    }
    // 窗口滚动
    $(window).scroll(function () {
        navFixed();
        if (flag) {
            toggleTab();
        }
    });
    // 点击导航跳转到指定位置
    $(".navBox li").click(function () {
        flag = false;
        var index = $(this).index();
        var current = $(".stamp").eq(index).offset().top - 80;
        $("body, html")
            .stop()
            .animate(
                {
                    scrollTop: current,
                },
                function () {
                    flag = true;
                    toggleTab();
                }
            );
    });

    // 模拟单选
    $(".select-group input").change(function () {
        if ($(this).prop("checked")) {
            $(this).parents("li").addClass("select");
            $(this).parents("li").siblings("li").removeClass("select");
        }
    });

    // 表单抖动
    $(".docBox a").click(function () {
        var box_left = 0;
        $("#packForm").css({
            left: box_left,
            position: "relative",
        });
        for (var i = 1; 4 >= i; i++) {
            $("#packForm").animate(
                {
                    left: box_left - (30 - 5 * i),
                },
                50,
                function () {
                    $("#packForm").css("left", 0);
                }
            );
            $("#packForm").animate(
                {
                    left: box_left + (30 - 5 * i),
                },
                50,
                function () {
                    $("#packForm").css("left", 0);
                }
            );
        }
    });

    // tab切换
    $(".tab-nav li").click(function () {
        var i = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(this).parents(".tabBox").find(".item").eq(i).show().siblings().hide();
    });
});

/********* 模态弹窗 *********/
// 留言成功
function success() {
    $(".select-group input").removeAttr('checked');
    $(".select-group li").removeClass("select");
    $(".ModalPop, .success").show();
}
// 提示警告
function tips(info) {
    $("#tipsInfo").text(info);
    $(".ModalPop, .tips").show();
}
// 关闭弹窗
$(".closePop, .confirmBtn").click(function () {
    $(".ModalPop, .success, .tips").hide();
});