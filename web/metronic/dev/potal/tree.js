/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global cunovs, __FILE__, Java, PotalUnits, SystemEvent, CertManager, com */

cunovs.defineCalss(__FILE__, {
    
    getSortNum : function(num){
        if(+num){
            return num < 100000;
        }
        return true;
    },
    service: function (jjs) {
        var level = jjs.get("parent"), data = [], isRoot = level === "#";
        jjs.getResponse().setContentType("application/x-json");

        if (isRoot) {
            data.push({"id": "0", "text": "集成管理" , children: true, type: "root"});
        } else {
            var db = new cunovsDB("plat"), rs = db.get("select application_id,default_title,mn_default_icon_url,0,default_seq from potal_menu order by default_seq")
            if (rs && rs.length)
                for (var i = 0; i < rs.length; i++){
                    if(this.getSortNum(rs[i][4])){
                        var icon = rs[i][2] === "" ? "fa fa-tag" : "fa fa-" + rs[i][2];
                        data.push({"id": rs[i][0], "text": rs[i][1], icon:icon});
                    }
                }
        }
        return JSON.stringify(data);
    }
});