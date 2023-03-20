;(function($){

    // 省份数组
var _provinceList = [
    {
        id:'beijin',
        name:'北京'
    },
    {
        id:'guangdong',
        name:'广东'
    },
    {
        id:'shanghai',
        name:'上海'
    },
    {
        id:'tianjin',
        name:'天津'
    },
    {
        id:'chongqing',
        name:'重庆'
    },
    {
        id:'liaoning',
        name:'辽宁'
    },
    {
        id:'jiangsu',
        name:'江苏'
    },
    {
        id:'hubei',
        name:'湖北'
    },
    {
        id:'sichuang',
        name:'四川'
    },
    {
        id:'sanxi',
        name:'陕西'
    },
    {
        id:'hebei',
        name:'河北'
    },
    {
        id:'shanxi',
        name:'山西'
    },
    {
        id:'henan',
        name:'河南'
    },
    {
        id:'jilin',
        name:'吉林'
    },
    {
        id:'heilongjiang',
        name:'黑龙江'
    },
    {
        id:'neimenggu',
        name:'内蒙古'
    },
    {
        id:'sandong',
        name:'山东'
    },
    {
        id:'anhui',
        name:'安徽'
    },
    {
        id:'zhejiang',
        name:'浙江'
    },
    {
        id:'fujian',
        name:'福建'
    },
    {
        id:'hunan',
        name:'湖南'
    },
    {
        id:'guangxi',
        name:'广西'
    },
    {
        id:'jiangxi',
        name:'江西'
    },
    {
        id:'guizhou',
        name:'贵州'
    },
    {
        id:'yunnan',
        name:'云南'
    },
    {
        id:'xizang',
        name:'西藏'
    },
    {
        id:'hainan',
        name:'海南'
    },
    {
        id:'gansu',
        name:'甘肃'
    },
    {
        id:'ningxia',
        name:'宁夏'
    },
    {
        id:'qinghai',
        name:'青海'
    },
    {
        id:'xinjiang',
        name:'新疆'
    },
]
var checkboxContent = function(element,config){
    this.$element = $(element);
    this.init(config) 
}
checkboxContent.prototype.init = function(config){
    var key = config.key;
    var boxList = config.checkboxList;
    let checkedBox = $('<div  id="prov" class="checkedbox-container"><div id="province-col" class="checkedbox-wrapper"></div></div>');
    for(let i = 0; i < boxList.length;i++){
        let id = boxList[i].id;
        let name = boxList[i].name;
        var html = '<div class="checkbox-item">'+
            '<input type="checkbox" name="'+id+'" id="'+id+key+'" value="'+name+'">'+
            '<label class="checkbox-item-label" for="'+id+key+'">'+name+'</label>'+
        '</div>'
        checkedBox.find('#province-col').append(html)
    }
    if(config.showSelectAll){
        var selcteAll = '<div id="selectAll" class="check-all-container"><div class="check-all-wrapper">'+
        '<input type="checkbox" name="all" id="sall'+key+'" value="padding-left: 0;">'+
        '<label class="checkbox-item-label" for="sall'+key+'">全选</label>'+
        +'</div></div>'
        $(selcteAll).prependTo(checkedBox)
    }
 this.$element.empty().append(checkedBox);
 this.setcheckedValue(config)
}

checkboxContent.prototype.setcheckedValue = function(config){
    let $checkAll =  this.$element.find("#selectAll input:checkbox").first();
    let $checkbox =  this.$element.find("#province-col input:checkbox");
    let checkedProv = [];
    // 全选
    if(config.checkedValue.length == config.checkboxList.length){
        $checkAll.prop('checked',true);
    }
    $checkAll.on('click',function(){
        let arr = [];
        if($(this).is(":checked")){
            $checkbox.each(function(){
                $(this).prop('checked',true);
                arr.push($(this).prop('value'));
            })
        }else{
            $checkbox.each(function(){
                $(this).prop('checked',false);
            })
        }
        if(config.getValue){
            config.getValue(arr)
        } 
    })
    // 单个选择
  $checkbox.each(function(i){
    if(config.checkedValue && config.checkedValue.length>0){
        for(let i = 0; i < config.checkedValue.length;i++){
            if($(this).prop('value') == config.checkedValue[i]){
                $(this).prop('checked',true);
            }
        }
    }
    if($(this).is(":checked")){
        checkedProv.push($(this).prop('value'));
    }
    
    $(this).on('click',function(){
        let arr = [];
        $checkbox.each(function(){
            if($(this).is(":checked")){
                arr.push($(this).prop('value'));
            }
        })
        if(config.getValue){
            config.getValue(arr)
        } 
        if(arr.length == config.checkboxList.length){
            $checkAll.prop('checked',true);
        }else{
            $checkAll.prop('checked',false);
        }
    })
})
if(config.getValue){
    config.getValue(checkedProv)
}
}

$.fn.checkboxContent = function(el){
    var config = $.extend({
        checkedValue:[], //默认选中的复选框值
        key:undefined,  //唯一键，必传
        checkboxList:_provinceList,  //要渲染的复选框选项数组
        showSelectAll:true, //是否显示全选按钮，默认true
    },el)

this.each(function(){
    $.data(this, new checkboxContent(this, $.extend(true, {}, config)));
    return this
})
}
})(jQuery)