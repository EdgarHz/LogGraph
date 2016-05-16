/**
 * Created by hzy on 5/13/16.
 */
require("../static/javascripts/entry.js")

// var startTime = 0;

function refreshData() {
    var pointList = $.ajax({url:"/find", async:false});

    var firstTime = pointList[0].startTime.parseInt;
    var lastTime = pointList[pointList.length -1].endTime.parseInt+1;
    var labels = [];
    for (var t = firstTime; t <=lastTime; t++) {
        labels.push(t);
    }
    var pointData = [];
    for (point in pointList) {
        pointData.push(point.startTime);
    }

    var ctx = $("#myChart");
    var chart = new Chart(ctx, {
        type: "line",
        data: {
            label: labels,
            data: pointData,
            fill: false
        }
    });
    setTimeout(refreshData,1000);
}

window.onload =function () {
    var hello = document.getElementById("hello");
    alert($);
    alert($(document));

};