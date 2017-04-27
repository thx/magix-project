define("app/views/mixins/loading",["magix","../../mixins/mask-loading"],function(i,n,t){var e=i("magix"),s=i("../../mixins/mask-loading");t.exports=e.View.extend({tmpl:{html:'<h3>Loading Mixin</h3><p>loading mixin只要view启用即可，不需要修改view中的任何方法即可完成相应的效果</p><p>通常某个view首次渲染时我们会在节点内部增加一个loading动画，而在view后续渲染时，不能把内容整个销毁换成动画，这个成本太高了。</p><p>为了解决后续也能显示一个加载动画，可启用该mixin，解决后续的动画显示。</p><p mx-guid="g0" class="p16-716 p16-03e">1</p><button mx-click="refresh()" class="pf0-btn pf0-046 p16-716">点此按钮3s后重新渲染当前view</button>',subs:[{s:"1",keys:["count"],tmpl:"第<%=$$.count%>次渲染页面",path:'p[mx-guid="g0"]'}]},mixins:[s],init:function(){this.$count=1},render:function(i){var n=this;i?setTimeout(n.wrapAsync(function(){n.updater.digest({count:n.$count})}),3e3):n.updater.digest({count:n.$count})},"refresh<click>":function(){this.$count++,this.render(!0)}})});