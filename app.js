(function(){
  "use strict";
  const U=Pandao,E=ToolEditor,P=Planning;
  E.workbench({key:"suppliers",title:"供应商评分比较器",icon:"◇",category:"采购决策",description:"设置价格、质量、交期和服务权重，比较供应商评分。",repo:"https://github.com/tianchaodaxing-beep/pandao-suppliers",inputTitle:"供应商评分",outputTitle:"评分结果",columns:[{label:"供应商",key:"supplier"},...[["价格评分","price"],["质量评分","quality"],["交期评分","delivery"],["服务评分","service"]].map(([label,key])=>({label,key,type:"number",default:0}))],examples:[{supplier:"演示供应商甲",price:80,quality:90,delivery:75,service:85},{supplier:"演示供应商乙",price:85,quality:80,delivery:90,service:75},{supplier:"演示供应商丙",price:70,quality:95,delivery:80,service:90}],parameters:[["价格权重（%）","price",25,"number"],["质量权重（%）","quality",35,"number"],["交期权重（%）","delivery",25,"number"],["服务权重（%）","service",15,"number"]],calculateLabel:"比较供应商",exportLabel:"导出评分结果",compute:(rows,p)=>P.suppliers(rows,p),export:(v,p)=>v.details.map(r=>({排名:r.rank,供应商:r.supplier,价格评分:r.price,质量评分:r.quality,交期评分:r.delivery,服务评分:r.service,综合评分:r.score,"价格权重（%）":Number(p.price),"质量权重（%）":Number(p.quality),"交期权重（%）":Number(p.delivery),"服务权重（%）":Number(p.service)})),view:v=>[
    U.metrics([["最高评分",v.details[0].score.toFixed(2),"分"],["供应商数量",v.details.length,"家"],["平均评分",v.average.toFixed(2),"分"]]),
    E.bars(v.details.map(r=>({label:r.supplier,value:r.score})),n=>n.toFixed(2)+"分"),
    E.table([{label:"排名",key:"rank",number:true},{label:"供应商",key:"supplier"},{label:"综合评分",value:r=>r.score.toFixed(2),number:true},{label:"质量评分",key:"quality",number:true},{label:"交期评分",key:"delivery",number:true}],v.details)
  ]});
})();
