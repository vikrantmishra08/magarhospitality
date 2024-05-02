!function () {
    var e = function (e) {
        this.element = e, this.datesContainer = this.element.getElementsByClassName("cd-h-timeline__dates")[0], this.line = this.datesContainer.getElementsByClassName("cd-h-timeline__line")[0], this.fillingLine = this.datesContainer.getElementsByClassName("cd-h-timeline__filling-line")[0], this.date = this.line.getElementsByClassName("cd-h-timeline__date"), this.selectedDate = this.line.getElementsByClassName("cd-h-timeline__date--selected")[0], this.dateValues = function (e) {
            for (var t = [], n = 0; n < e.date.length; n++) {
                var a = e.date[n].getAttribute("data-date"),
                    i = a.split("T");
                if (i.length > 1) var l = i[0].split("/"),
                    s = i[1].split(":");
                else if (i[0].indexOf(":") >= 0) var l = ["2000", "0", "0"],
                    s = i[0].split(":");
                else var l = i[0].split("/"),
                    s = ["0", "0"];
                var d = new Date(l[2], l[1] - 1, l[0], s[0], s[1]);
                t.push(d)
            }
            return t
        }(this), this.minLapse = function (e) {
            for (var t = [], n = 1; n < e.dateValues.length; n++) {
                var a = s(e.dateValues[n - 1], e.dateValues[n]);
                a > 0 && t.push(a)
            }
            return t.length > 0 ? Math.min.apply(null, t) : 864e5
        }(this), this.navigation = this.element.getElementsByClassName("cd-h-timeline__navigation"), this.contentWrapper = this.element.getElementsByClassName("cd-h-timeline__events")[0], this.content = this.contentWrapper.getElementsByClassName("cd-h-timeline__event"), this.eventsMinDistance = 60, this.eventsMaxDistance = 200, this.translate = 0, this.lineLength = 0, this.oldDateIndex = Util.getIndexInArray(this.date, this.selectedDate), this.newDateIndex = this.oldDateIndex,
            function (e) {
                for (var t = 0, a = 0; a < e.dateValues.length; a++) {
                    var i = 0 == a ? 0 : a - 1,
                        d = s(e.dateValues[i], e.dateValues[a]),
                        r = (Math.round(d / e.minLapse) + 2) * e.eventsMinDistance;
                    r < e.eventsMinDistance ? r = e.eventsMinDistance : r > e.eventsMaxDistance && (r = e.eventsMaxDistance), t += r, e.date[a].setAttribute("style", "left:" + t + "px")
                }
                e.line.style.width = t + e.eventsMinDistance + "px", e.lineLength = t + e.eventsMinDistance, Util.addClass(e.element, "cd-h-timeline--loaded"), n(e, e.selectedDate), l(e, "next")
            }(this),
            function (e) {
                var i = e;
                i.navigation[0].addEventListener("click", function (e) {
                    e.preventDefault(), t(i, "prev")
                }), i.navigation[1].addEventListener("click", function (e) {
                    e.preventDefault(), t(i, "next")
                }), new SwipeContent(i.datesContainer), i.datesContainer.addEventListener("swipeLeft", function (e) {
                    t(i, "next")
                }), i.datesContainer.addEventListener("swipeRight", function (e) {
                    t(i, "prev")
                });
                for (var l = 0; l < i.date.length; l++) ! function (e) {
                    // Removed the click event listener for dates
                }(l)
            }(this)
    };

    function t(e, t) {
        var n = e.datesContainer.offsetWidth;
        t && (e.translate = "next" == t ? e.translate - n + e.eventsMinDistance : e.translate + n - e.eventsMinDistance), 0 - e.translate > e.lineLength - n && (e.translate = n - e.lineLength), e.translate > 0 && (e.translate = 0), e.line.style.transform = "translateX(" + e.translate + "px)", 0 == e.translate ? Util.addClass(e.navigation[0], "cd-h-timeline__navigation--inactive") : Util.removeClass(e.navigation[0], "cd-h-timeline__navigation--inactive"), e.translate == n - e.lineLength ? Util.addClass(e.navigation[1], "cd-h-timeline__navigation--inactive") : Util.removeClass(e.navigation[1], "cd-h-timeline__navigation--inactive")
    }

    function n(e, t) {
        e.newDateIndex = Util.getIndexInArray(e.date, t), e.oldDateIndex = Util.getIndexInArray(e.date, e.selectedDate), Util.removeClass(e.selectedDate, "cd-h-timeline__date--selected"), Util.addClass(e.date[e.newDateIndex], "cd-h-timeline__date--selected"), e.selectedDate = e.date[e.newDateIndex],
            function (e) {
                for (var t = 0; t < e.date.length; t++) t < e.newDateIndex ? Util.addClass(e.date[t], "cd-h-timeline__date--older-event") : Util.removeClass(e.date[t], "cd-h-timeline__date--older-event")
            }(e),
            function (e) {
                if (e.newDateIndex > e.oldDateIndex) var t = "cd-h-timeline__event--selected cd-h-timeline__event--enter-right",
                    n = "cd-h-timeline__event--leave-left";
                else if (e.newDateIndex < e.oldDateIndex) var t = "cd-h-timeline__event--selected cd-h-timeline__event--enter-left",
                    n = "cd-h-timeline__event--leave-right";
                else var t = "cd-h-timeline__event--selected",
                    n = "";
                Util.addClass(e.content[e.newDateIndex], t), e.newDateIndex != e.oldDateIndex && (Util.removeClass(e.content[e.oldDateIndex], "cd-h-timeline__event--selected"), Util.addClass(e.content[e.oldDateIndex], n), e.contentWrapper.style.height = e.content[e.newDateIndex].offsetHeight + "px")
            }(e),
            function (e) {
                var t = window.getComputedStyle(e.selectedDate, null),
                    n = t.getPropertyValue("left"),
                    a = t.getPropertyValue("width");
                n = Number(n.replace("px", "")) + Number(a.replace("px", "")) / 2, e.fillingLine.style.transform = "scaleX(" + n / e.lineLength + ")"
            }(e)
    }

    function a(e) {
        e.contentWrapper.style.height = null, Util.removeClass(e.content[e.newDateIndex], "cd-h-timeline__event--enter-right cd-h-timeline__event--enter-left"), Util.removeClass(e.content[e.oldDateIndex], "cd-h-timeline__event--leave-right cd-h-timeline__event--leave-left")
    }

    function i(e, t) {
        var a = "next" == t ? e.newDateIndex + 1 : e.newDateIndex - 1;
        a < 0 || a >= e.date.length || (n(e, e.date[a]), l(e, t))
    }

    function l(e, n) {
        var a = window.getComputedStyle(e.selectedDate, null),
            i = Number(a.getPropertyValue("left").replace("px", "")),
            l = e.datesContainer.offsetWidth;
        ("next" == n && i >= l - e.translate || "prev" == n && i <= -e.translate) && (e.translate = l / 2 - i, t(e, !1))
    }

    function s(e, t) {
        return Math.round(t - e)
    }
    window.HorizontalTimeline = e;
    var d = document.getElementsByClassName("js-cd-h-timeline"),
        r = [];
    if (d.length > 0) {
        for (var o = 0; o < d.length; o++) r.push(new e(d[o]));
        document.addEventListener("keydown", function (e) {
            e.keyCode && 39 == e.keyCode || e.key && "arrowright" == e.key.toLowerCase() ? c("next") : (e.keyCode && 37 == e.keyCode || e.key && "arrowleft" == e.key.toLowerCase()) && c("prev")
        })
    }

    function c(e) {
        for (var t = 0; t < r.length; t++) h(d[t]) && i(r[t], e)
    }

    function h(e) {
        for (var t = e.offsetTop, n = e.offsetLeft, a = e.offsetWidth, i = e.offsetHeight; e.offsetParent;) t += (e = e.offsetParent).offsetTop, n += e.offsetLeft;
        return t < window.pageYOffset + window.innerHeight && n < window.pageXOffset + window.innerWidth && t + i > window.pageYOffset && n + a > window.pageXOffset
    }
}();
