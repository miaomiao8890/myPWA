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
    self.isScroll = true;
    e.preventDefault();
    self.tempX = pageX-self.startX;
    self.tempY = pageY-self.startY;
};
Slide.prototype._end=function(e){
    e.stopPropagation();

    var self=this;
    var ops=self.options;
    self.stop=false;

    // console.log(self.tempX)

    if (self.tempX > 50) {
        self.options.successCallback('prev')
    } else if (self.tempX < -50) {
        self.options.successCallback('next')
    } else {
        self.options.successCallback('')
    }
    // self.options.successCallback();

    self.scrolling = false;
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