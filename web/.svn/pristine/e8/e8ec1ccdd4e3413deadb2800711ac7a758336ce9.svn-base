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

    service: function (jjs) {
        var level = jjs.get("parent"), data = [], isRoot = level === "#";
        jjs.getResponse().setContentType("application/x-json");

        if (isRoot) {
            data.push({"id": "0", "text": "集成管理" , children: true, type: "root"});
        } else {
            var db = new cunovsDB("plat"), rs = db.get("select application_id,default_title,default_icon_url,0 from potal_menu order by default_seq")
            if (rs && rs.length)
                for (var i = 0; i < rs.length; i++)
                    data.push({"id": rs[i][0], "text": rs[i][1],icon:rs[i][2]});
        }
        return JSON.stringify(data);
    }
});