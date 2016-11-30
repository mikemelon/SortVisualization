var dataset=[ 4, 8, 3, 2, 9, 10, 6, 2, 8, 7, 1];
var len = dataset.length;

var state=[];//排序数组中间状态
var highlightState=[];//交换元素中间状态，红色高亮
var fixState=[];//排序完毕元素中间状态，绿色高亮

state.push(dataset.slice());
highlightState.push([-1,-1]);
fixState.push([]);

var createDescArray = function(endNum,cnt){
    var descArray =[];
    for(var i=endNum; i>endNum-cnt; i--){
        descArray.push(i);
    }
    return descArray;
}

for(var i=len-1; i>0; i--){
    for(var j=0; j<i; j++){

        state.push(dataset.slice());
        highlightState.push([j,j+1]);
        if(i<len-1){
            fixState.push(createDescArray(len-1,len-1-i));
        }else{
            fixState.push([]);
        }

        if(dataset[j]>dataset[j+1]){
            var tmp = dataset[j];
            dataset[j] = dataset[j+1];
            dataset[j+1] = tmp;

            state.push(dataset.slice());
            highlightState.push([j,j+1]);
            if(i<len-1){
                fixState.push(createDescArray(len-1,len-1-i));
            }else{
                fixState.push([]);
            }
        }
    }
}

var draw = function() {
    var s = state.shift() || [];
    var s2 = highlightState.shift() ||[];
    var s3 = fixState.shift()||[];

    if (s.length) {
        console.log("-----------------");
        console.log(s);
        console.log(s2);
        console.log(s3);
        console.log("-------------------");
        d3.select("body").selectAll("div.bar").remove();

        var selection=d3.select("body")
            .selectAll("div.bar")
            .data(s);
        selection.enter()
            .append("div")
            .attr("class","bar")
            .style("height",function(d){
                return d*40+"px";
            })
            .style("background-color",function(d,i){
                if(s3.indexOf(i)!=-1){
                    return "#11bb11";
                }else if(s2.indexOf(i)!=-1){
                    return "#de1111";
                }
            });

        selection.append("span")
            .attr("class","digitLabel")
            .text(function (d) {return d;});
    }
}

setInterval(draw,200);