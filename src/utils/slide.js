/*
 * @author: sunchi <sunchi@cmcm.com>
 * @date: 2016-04-8
 */
function Slide(opt){
    return (this instanceof Slide)?this.init(opt):new Slide(opt);
}
Slide.prototype.init=function(opt){
    var self = this,isSupportTouch="ontouchend" in document?true:false,events={};
    events=isSupportTouch?{start:'touchstart',move:'touchmove',end:'touchend'}:{start:'mousedown',move:'mousemove',end:'mouseup'};
    var element = document.getElementById(opt.element);
    var options = self.options = {
        slideElement: element,
        isSupportTouch: isSupportTouch,
        events: events,
        successCallback: opt.successCallback,
    }
    self.tempX=0;self.tempY=0;self.startX=0;self.startY=0;self.current=opt.index?opt.index:0;
    options.slideElement.addEventListener(events.start,self,false);
    // options.slideElement.addEventListener('click',self,false );

    return self;
};
Slide.prototype._doPlay=function(){
    var self=this;
    var ops=self.options;
    self._translate((1-self.index)*self.options.height, 500);
    self.options.successCallback();
};
Slide.prototype._start=function(e){
    var self = this;
    self.isScroll = false;
    if(self.scrolling) return;
    self.scrolling = true;
    self.moveReady = false;
    self.stop = true;
    var point=self._getPage(e),events=self.options.events,element=self.options.slideElement;
    self.tempX=0;self.tempY=0;self.startX=point.pageX;self.startY=point.pageY;

    element.addEventListener(events.move,self,false);
    element.addEventListener(events.end,self,false);
};
Slide.prototype._move=function(e){
    var self=this;
    // e.preventDefault();
    if(!self.scrolling)return;
    if(self.options.isSupportTouch){if(e.touches.length > 1||e.scale&&e.scale !== 1)return;}
    var point=self._getPage(e),ops=self.options;
    var pageX = point.pageX
        , pageY = point.pageY;
    // if(self.moveReady){
        // console.log(self.moveReady)
        self.isScroll = true;
        e.preventDefault();
        self.tempX = pageX-self.startX;
        self.tempY = pageY-self.startY;
        // // console.log(self.tempY)
        // var ina = 0;
        // if(self.tempY < 0) {
        //     ina = -10;
        // }
        // else {
        //     ina = 10;
        // }
        // var cpage = parseInt((self.tempY+ina)/self.options.height);
        // if(self.tempPage != cpage) {
        //     self.tempPage = cpage;
        //     var currentPage = self.current - cpage;
        //     if(currentPage >= 0 && currentPage < self.size) {
        //         self.index = currentPage;
        //         ops.element.querySelector('.current').className = '';
        //         ops.element.children[self.index].className = 'current';
        //     }
        // }

        // disY=(1-self.current)*self.options.height+self.tempY;
        // // console.log(disY)
        // if(disY > self.options.height*2 && self.index == 0) {
        //     disY = self.options.height*2;
        // }
        // else if(disY < -self.options.height*(self.size-1) && self.index == self.size-1) {
        //     disY = -self.options.height*(self.size-1);
        // }
        // self._translate(disY,0);
        // self.options.moveCallback(self.tempY, self.current+1, self.size);
    // }else{
    //     var x=Math.abs(self.startX-pageX),y=Math.abs(self.startY-pageY);
    //     var z=Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    //     var a=180/(Math.PI/Math.acos(x/z));
    //     console.log(a)
    //     if (z > 5) {
    //         if (a > 55) {
    //             e.preventDefault();
    //             self.moveReady = true;
    //             // self.options.element.addEventListener('click',self,false);
    //         }else {
    //             self.scrolling = false;
    //         }
    //     }
    // }
};
Slide.prototype._end=function(e){
    e.stopPropagation();

    var self=this;
    var ops=self.options;
    self.stop=false;

    console.log(self.tempX)

        if (self.tempX > 0) {
            console.log('right')
        } else if (self.tempX < 0) {
            console.log('left')
        } else {
            console.log('----')
        }
    // self.options.successCallback();

    self.scrolling = false;
    self.moveReady = false;
    ops.slideElement.removeEventListener(ops.events.move,self,false);
    ops.slideElement.removeEventListener(ops.events.end,self,false);
};
Slide.prototype._click=function(e){
    // e.preventDefault();
    // e.stopPropagation();
    var list = this.options.slideElement.getElementsByTagName('li');
    for (var i = 0; i < list.length; i++) {
        list[i].className = '';
    };
    var target = e.target || e.srcElement;
    target.className = 'current';
    var index = this.getIndex(target);
    this.current = this.index = index;
    var distY = this.options.height*(1 - index);
    this._translate(distY, 500);
    this.options.successCallback(this.options.secondCb);
};
Slide.prototype._getPage=function(e){
    return e.changedTouches?e.changedTouches[0]:e;
};
Slide.prototype._translate=function(dist,speed){
    var style=this.options.element.style;
    style.webkitTransitionDuration=style.MozTransitionDuration=style.msTransitionDuration=style.OTransitionDuration=style.transitionDuration = speed+'ms';
    style.webkitTransform=style.MozTransform=style.transform='translate(0, '+dist+'px)'+'translateZ(0)';
};
Slide.prototype.handleEvent=function(event){
    var self = this;
    var events=self.options.events;
    switch (event.type) {
        case events.start:self._start(event); break;
        case events.move:self._move(event); break;
        case events.end:self._end(event); break;
        case 'click': self._click(event); break;
    }
};
Slide.prototype.getIndex = function(ele){
    var a=[];
    if(ele&&ele.nodeType&&ele.nodeType==1) {
        var oParent=ele.parentNode;
        var type = ele.nodeName;
        var oChilds=oParent.getElementsByTagName(type);
        for(var i=0;i<oChilds.length;i++){
            if(oChilds[i]==ele)
            return i;
        }
    }
}
module.exports = Slide;